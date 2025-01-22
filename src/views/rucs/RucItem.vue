<script setup lang="ts">
import { Ruc } from '@/models/Ruc';
import user from '@/assets/images/products/rucs.png';
import useRucMutations from '@/composables/ruc/useRucMutations';
import { computed, ref, watch } from 'vue';
import { toast } from 'vue3-toastify';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { VBtn, VSelect } from 'vuetify/lib/components/index.mjs';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import WorkingSRIAnimation from './WorkingSRIAnimation.vue';

interface props {
    ruc: Ruc;
}

const { synchronizeRucMutations, deleteRucMutations, updateRucMutations, synchronizeCustomeDateMutations } = useRucMutations();
const props = defineProps<props>();
const propsRuc = ref({ ...props.ruc });
const emit = defineEmits(['ruc-delete', 'ruc-update']);
const showFormDialog = ref(false);
const documents = ref(['Facturas']);
const showEditFormDialog = ref(false);
const showSynchronizeDialog = ref(false);
const deleteInput = ref();
const { mdAndUp } = useDisplay();
const showWaitForMutationDialog = ref(false);
const isLoading = computed(() => deleteRucMutations.isPending.value || updateRucMutations.isPending.value);
const isSynchronizeLoading = computed(() => synchronizeRucMutations.isPending.value || synchronizeCustomeDateMutations.isPending.value);
let now = new Date();
now.setFullYear(now.getFullYear() - 4);
const minDate = ref(now);

const date = ref({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
});

const onCustomeSubmit = () => {
    if (date.value) {
        console.log(date.value);
        synchronizeCustomeDateMutations.mutate({
            id: props.ruc.id,
            month: date.value.month + 1,
            year: date.value.year,
            documents: documents.value
        });
    } else {
        synchronizeRucMutations.mutate(props.ruc);
    }
};

watch(synchronizeRucMutations.isError, () => {
    if (synchronizeRucMutations.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = synchronizeRucMutations.error.value as AxiosError<{
            message: string;
        }>;
        if (error.response?.data?.message) {
            errorMessage = JSON.stringify(error.response?.data?.message);
        }
        toast.error(errorMessage, {
            autoClose: 3000,
            closeButton: true
        });
    }
});

watch(synchronizeRucMutations.isSuccess, () => {
    if (synchronizeRucMutations.isSuccess.value) {
        Swal.fire({
            title: 'Sincronización enviada',
            html: "Estamos trabajando por ti. En un momento verás la información solicitada, al terminar se te notificará por <span class='tw-font-semibold'>WhatsApp y Correo electrónico</span>"
        });
        showSynchronizeDialog.value = false;
    }
});

watch(synchronizeCustomeDateMutations.isError, () => {
    if (synchronizeCustomeDateMutations.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = synchronizeCustomeDateMutations.error.value as AxiosError<{
            message: string;
        }>;
        if (error.response?.data?.message) {
            errorMessage = JSON.stringify(error.response?.data?.message);
        }
        toast.error(errorMessage, {
            autoClose: 3000,
            closeButton: true
        });
    }
});

watch(synchronizeCustomeDateMutations.isSuccess, () => {
    if (synchronizeCustomeDateMutations.isSuccess.value) {
        Swal.fire({
            title: 'Sincronización enviada',
            html: "Estamos trabajando por ti. En un momento verás la información solicitada, al terminar se te notificará por <span class='tw-font-semibold'>WhatsApp y Correo electrónico</span>"
        });
        props.ruc.is_synchronizing = true;
        date.value = {
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        };
        showSynchronizeDialog.value = false;
    }
});

watch(deleteRucMutations.isError, () => {
    if (deleteRucMutations.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = deleteRucMutations.error.value as AxiosError<{
            message: string;
        }>;
        if (error.response?.data?.message) {
            errorMessage = JSON.stringify(error.response?.data?.message);
        }
        toast.error(errorMessage, {
            autoClose: 3000,
            closeButton: true
        });
    }
});

watch(deleteRucMutations.isSuccess, () => {
    if (deleteRucMutations.isSuccess.value) {
        emit('ruc-delete', props.ruc.id);
        toast.success('Ruc eliminado', {
            autoClose: 3000,
            closeButton: true
        });
        showFormDialog.value = false;
    }
});

watch(updateRucMutations.isError, () => {
    if (updateRucMutations.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = updateRucMutations.error.value as AxiosError<{
            message: string;
        }>;
        if (error.response?.data?.message) {
            errorMessage = JSON.stringify(error.response?.data?.message);
        }
        toast.error(errorMessage, {
            autoClose: 3000,
            closeButton: true
        });
        showWaitForMutationDialog.value = false;
    }
});

watch(updateRucMutations.isSuccess, () => {
    if (updateRucMutations.isSuccess.value) {
        let response = updateRucMutations.data.value;
        if (response) {
            if (response.ruc.wrongPassword) {
                toast.warning(response.message);
            } else {
                toast.success('Contraseña actualizada 👌', {
                    autoClose: 3000,
                    closeButton: true
                });
            }
            emit('ruc-update', response.ruc);
        }
        showWaitForMutationDialog.value = false;
    }
});

const onRucSubmit = () => {
    if (props.ruc.password) {
        updateRucMutations.mutate(propsRuc.value);
        showEditFormDialog.value = false;
        showWaitForMutationDialog.value = true;
    }
};

watch(documents, (newValue, oldValue) => {
    if (newValue.length <= 0) {
        documents.value = oldValue;
        return;
    }

    if (newValue.includes('Todos') && newValue.length > 1) {
        documents.value = ['Todos'];
    }

    if (oldValue.includes('Todos') && oldValue.length <= 1) {
        documents.value = newValue.filter((x) => x != 'Todos');
    }
});
</script>

<template>
    <v-tooltip text="Este ruc tiene la contraseña mal" :disabled="!ruc.wrongPassword">
        <template v-slot:activator="{ props }">
            <div
                class="tw-shadow-sm tw-rounded-md tw-overflow-hidden tw-relative tw-group tw-transition-all tw-duration-100"
                :class="ruc.wrongPassword ? 'tw-border-[1px] tw-border-red-500' : ''"
                v-bind="props"
            >
                <div
                    class="tw-absolute group-hover:tw-flex tw-hidden tw-transition-all tw-duration-100 tw-flex-col tw-gap-1 tw-left-2 tw-top-1"
                >
                    <VBtn icon="mdi-trash-can" variant="text" color="error" class="" @click="showFormDialog = true" />
                    <VBtn icon="mdi-pencil" variant="text" color="success" class="" @click="showEditFormDialog = true" />
                </div>
                <div
                    class="tw-flex tw-shadow-sm tw-flex-col tw-w-full tw-h-full tw-justify-center tw-items-center bg-surface tw-pb-8 tw-pt-3 tw-gap-3 tw-px-3"
                >
                    <VAvatar :image="user" size="80" />
                    <div class="">
                        <h1 class="tw-text-base text-primary">Nombre: {{ ruc.name }}</h1>
                    </div>
                    <div class="">
                        <h1 class="text-secondary tw-text-base md:tw-text-lg">RUC: {{ ruc.ruc }}</h1>
                    </div>
                </div>
                <div class="tw-py-2 tw-flex tw-flex-col md:tw-flex-row tw-gap-2 tw-justify-center tw-items-center">
                    <VBtn
                        color="primary"
                        @click="showSynchronizeDialog = true"
                        :disabled="ruc.is_synchronizing"
                        :loading="synchronizeRucMutations.isPending.value"
                        id="a8491f20-eb17-4d41-9574-6c441820ca17"
                    >
                        Sincronizar</VBtn
                    >
                    <VBtn
                        color="warning"
                        :loading="synchronizeRucMutations.isPending.value"
                        :to="{ name: 'documents-list', params: { ruc: ruc.ruc } }"
                        >Documentos</VBtn
                    >
                </div>
            </div>
        </template>
    </v-tooltip>

    <v-dialog max-width="700" v-model="showEditFormDialog">
        <form action="" @submit.prevent="onRucSubmit">
            <VCard>
                <VCardTitle class="bg-primary">
                    <h1>Vamos a actualizar tu RUC</h1>
                </VCardTitle>
                <VCardText>
                    <VRow>
                        <VCol cols="0" md="6" v-if="mdAndUp">
                            <div class="d-flex tw-justify-center tw-items-center">
                                <img class="tw-w-48" src="/src/assets/images/usable/ruc_form.png" />
                            </div>
                        </VCol>
                        <VCol cols="0" md="6">
                            <div class="tw-flex tw-flex-col tw-gap-1">
                                <label for="">Actualizar contraseña</label>
                                <VTextField placeholder="Contraseña" v-model="propsRuc.password" hide-details="auto" />
                            </div>
                        </VCol>
                    </VRow>
                </VCardText>
                <VCardActions>
                    <div class="tw-flex tw-w-full tw-justify-end tw-gap-2">
                        <VBtn flat color="borderColor" variant="elevated" @click="showEditFormDialog = false" :loading="isLoading">
                            cancelar
                        </VBtn>
                        <VBtn color="primary" variant="elevated" type="submit" :loading="isLoading"> Guardar Ruc</VBtn>
                    </div>
                </VCardActions>
            </VCard>
        </form>
    </v-dialog>
    <v-dialog max-width="700" v-model="showFormDialog">
        <form action="" @submit.prevent="onRucSubmit">
            <VCard>
                <VCardTitle class="bg-primary">
                    <h1>Vamos a eliminar tu RUC</h1>
                </VCardTitle>
                <VCardText>
                    <VRow>
                        <VCol cols="0" md="6" v-if="mdAndUp">
                            <img src="/src/assets/images/usable/ruc_form.png" />
                        </VCol>
                        <VCol cols="0" md="6">
                            <VRow>
                                <VCol cols="12">
                                    <p class="tw-text-sm tw-text-gray-400">Numero de ruc</p>
                                    <span class="tw-text-red-400 tw-text-xl">{{ props.ruc.ruc }}</span>
                                </VCol>
                                <VCol cols="12">
                                    <div class="tw-flex tw-flex-col tw-gap-1">
                                        <label for=""
                                            >Escriba su número de RUC en el campo siguiente para proceder con su eliminación.</label
                                        >
                                        <VTextField :placeholder="props.ruc.ruc" v-model="deleteInput" hide-details="auto" />
                                    </div>
                                </VCol>
                            </VRow>
                        </VCol>
                    </VRow>
                </VCardText>
                <VCardActions>
                    <div class="tw-flex tw-w-full tw-justify-end tw-gap-2">
                        <VBtn flat color="borderColor" variant="elevated" @click="showFormDialog = false" :loading="isLoading">
                            cancelar
                        </VBtn>
                        <VBtn
                            color="error"
                            variant="elevated"
                            :disabled="deleteInput != ruc.ruc"
                            @click="deleteRucMutations.mutate(ruc.id)"
                            :loading="isLoading"
                        >
                            Eliminar Ruc</VBtn
                        >
                    </div>
                </VCardActions>
            </VCard>
        </form>
    </v-dialog>
    <v-dialog max-width="700" v-model="showWaitForMutationDialog">
        <WorkingSRIAnimation />
    </v-dialog>
    <v-dialog max-width="700" v-model="showSynchronizeDialog">
        <form action="" @submit.prevent="onRucSubmit">
            <VCard>
                <VCardTitle class="bg-primary">
                    <h1>
                        Vamos a sincronizar <span class="tw-font-semibold">{{ props.ruc.ruc }}</span>
                    </h1>
                </VCardTitle>
                <VCardText>
                    <VRow>
                        <VCol cols="0" md="6" v-if="mdAndUp">
                            <img src="/src/assets/images/usable/ruc_form.png" />
                        </VCol>
                        <VCol cols="0" md="6">
                            <VRow>
                                <VCol cols="12">
                                    <p class="tw-text-sm tw-text-gray-400">
                                        Vamos a sincronizar su ruc, puede seleccionar otras fechas y que tipo de documentos desea
                                        sincronizar
                                    </p>
                                </VCol>
                                <VCol cols="12">
                                    <div class="tw-flex tw-flex-col tw-gap-1">
                                        <label for="">Fecha a sincronizar</label>
                                        <VueDatePicker
                                            v-model="date"
                                            month-picker
                                            teleport-center
                                            :max-date="new Date()"
                                            :min-date="minDate"
                                            :clearable="false"
                                        />
                                    </div>
                                </VCol>
                                <VCol cols="12">
                                    <div class="tw-flex tw-flex-col tw-gap-1">
                                        <label for="">Tipo de documentos</label>
                                        <VSelect
                                            :items="['Facturas', 'Notas de Credito', 'Notas de Debito', 'Retenciones', 'Anulados', 'Todos']"
                                            placeholder="Tipo de documento"
                                            :disabled="date == null"
                                            v-model="documents"
                                            multiple
                                            density="compact"
                                        />
                                    </div>
                                </VCol>
                            </VRow>
                        </VCol>
                    </VRow>
                </VCardText>
                <VCardActions>
                    <div class="tw-flex tw-w-full tw-justify-end tw-gap-2">
                        <VBtn
                            flat
                            color="borderColor"
                            variant="elevated"
                            @click="showSynchronizeDialog = false"
                            :loading="isSynchronizeLoading"
                        >
                            cancelar
                        </VBtn>
                        <VBtn color="primary" variant="elevated" @click="onCustomeSubmit" :loading="isSynchronizeLoading">
                            Sincronizar
                        </VBtn>
                    </div>
                </VCardActions>
            </VCard>
        </form>
    </v-dialog>
</template>

<style scoped></style>
