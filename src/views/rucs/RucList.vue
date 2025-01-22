<script setup lang="ts">
import useRucs from '@/composables/ruc/useRucs';
import RucItem from './RucItem.vue';
import useRucMutations from '@/composables/ruc/useRucMutations';
import { ref, watch } from 'vue';
import { Ruc } from '@/models/Ruc';
import { helpers, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { VBtn, VCard } from 'vuetify/lib/components/index.mjs';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { toast } from 'vue3-toastify';
import { AxiosError } from 'axios';
import { Icon } from '@iconify/vue';
import useSuscription from '@/composables/plans/useSuscription';
import { userStore } from '@/stores/useStore';
import WorkingSRIAnimation from './WorkingSRIAnimation.vue';

const store = userStore();

const { isRucsLoading, refetch, rucs, rucsHasError, idlRucs } = useRucs();
const { suscription, suscriptionHasError } = useSuscription();

const { saveRucMutations } = useRucMutations();
const ruc = ref<Ruc>({} as Ruc);
const search = ref();
const showFormDialog = ref(false);
const showWaitForMutationDialog = ref(false);
const showOverLimitDialog = ref(false);

const { mdAndUp } = useDisplay();
const rucRules = {
    ruc: { required: helpers.withMessage('El RUC es requerido', required) },
    name: { required: helpers.withMessage('El Nombre es requerido', required) },
    password: { required: helpers.withMessage('La contraseña es requerida', required) }
};

const checkRucs = () => {
    try {
        if (rucs.value.length >= suscription.value.rucs) {
            showOverLimitDialog.value = true;
        } else {
            showFormDialog.value = true;
        }
    } catch (error) {
        showFormDialog.value = true;
    }
};

const rucValidator = useVuelidate(rucRules, ruc);
const onRucSubmit = () => {
    rucValidator.value.$validate();
    if (!rucValidator.value.$error) {
        saveRucMutations.mutate(ruc.value);
        showFormDialog.value = false;
        showWaitForMutationDialog.value = true;
    }
};

watch(search, () => {
    if (search.value) {
        rucs.value = idlRucs.value.filter((x) => x.ruc.includes(search.value) || x.name.includes(search.value));
    } else {
        rucs.value = idlRucs.value;
    }
});

watch(saveRucMutations.isError, () => {
    if (saveRucMutations.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = saveRucMutations.error.value as AxiosError<{
            message: string;
        }>;
        if (error.response?.data?.message) {
            errorMessage = JSON.stringify(error.response?.data?.message);
        }
        showWaitForMutationDialog.value = false;
        toast.error(errorMessage);
    }
});
watch(saveRucMutations.isSuccess, () => {
    if (saveRucMutations.isSuccess.value) {
        showFormDialog.value = false;
        ruc.value = {} as Ruc;
        let response = saveRucMutations.data.value;
        if (response) {
            if (response.ruc.wrongPassword) {
                toast.warning(response.message);
            } else {
                toast.success('RUC guardado exitosamente', {
                    autoClose: 3000,
                    closeButton: true
                });
            }
            rucs.value.push(response.ruc);
        }
        showWaitForMutationDialog.value = false;
    }
});

const onDelete = (id: number) => {
    rucs.value = rucs.value.filter((x) => x.id != id);
    idlRucs.value = idlRucs.value.filter((x) => x.id != id);
};
const onUpdate = (ruc: Ruc) => {
    try {
        let index = rucs.value.indexOf(rucs.value.find((x) => x.id == ruc.id)!!);
        rucs.value[index] = ruc;
    } catch (error) {}
};

function handleCloseDialog() {
    // Cierra el diálogo
    showWaitForMutationDialog.value = false;
}

</script>

<template>
    <VRow v-if="isRucsLoading">
        <VCol cols="12"> </VCol>
        <VCol cols="12" md="12" lg="4">
            <div class="tw-flex tw-h-full tw-justify-start tw-items-center">
                <h1 class="text-primary tw-text-lg md:tw-text-xl">Cargando...</h1>
            </div>
        </VCol>
        <VCol cols="12" md="6" lg="4">
            <div class="tw-flex tw-h-full tw-justify-center tw-items-center">
                <VTextField
                    prepend-inner-icon="mdi-magnify"
                    placeholder="Buscar por Nombre/RUC"
                    variant="solo"
                    flat
                    class="tw-w-full"
                    density="compact"
                    hide-details
                />
            </div>
        </VCol>
        <VCol cols="12" md="6" lg="4">
            <div class="tw-flex tw-h-full tw-justify-end tw-items-center">
                <VBtn color="primary" @click="showFormDialog = true">
                    <Icon icon="material-symbols:add-circle-outline" height="18" class="mr-2" />Añadir Ruc
                </VBtn>
            </div>
        </VCol>
        <VCol cols="6" md="4" v-for="ruc in 3">
            <v-skeleton-loader type="card" color="borderColor"></v-skeleton-loader>
        </VCol>
    </VRow>
    <VRow v-else-if="rucsHasError">
        <VCol>
            <p>Error</p>
        </VCol>
    </VRow>
    <VRow v-else>
        <VCol cols="12"> </VCol>
        <VCol cols="12" md="12" lg="4">
            <div class="tw-flex tw-h-full tw-justify-start tw-items-center">
                <h1 class="text-primary tw-text-lg md:tw-text-xl">
                    Ruc creados <span class="tw-px-2 tw-py-1 tw-rounded-md bg-secondary">{{ idlRucs.length }}</span>
                </h1>
            </div>
        </VCol>
        <VCol cols="12" md="6" lg="4">
            <div class="tw-flex tw-h-full tw-justify-center tw-items-center">
                <VTextField
                    prepend-inner-icon="mdi-magnify"
                    placeholder="Buscar Ruc"
                    variant="solo"
                    flat
                    v-model.trim="search"
                    class="tw-w-full"
                    density="compact"
                    hide-details
                />
            </div>
        </VCol>
        <VCol cols="12" md="6" lg="4">
            <div class="tw-flex tw-h-full tw-justify-end tw-items-center">
                <VBtn color="primary" @click="checkRucs">
                    <Icon icon="material-symbols:add-circle-outline" height="18" class="mr-2" />Añadir Ruc
                </VBtn>
            </div>
        </VCol>

        <VCol cols="6" md="4" v-for="ruc in rucs">
            <RucItem :ruc="ruc" @ruc-delete="onDelete" @ruc-update="onUpdate" />
        </VCol>

        <VDialog v-model="showOverLimitDialog" max-width="900" rounded="lg">
            <div class="tw-rounded-lg tw-py-2 tw-overflow-hidden bg-surface">
                <v-toolbar class="bg-surface" height="100px">
                    <v-spacer></v-spacer>
                    <VBtn icon="mdi-close" density="compact" @click="showOverLimitDialog = false"></VBtn>
                </v-toolbar>
                <div class="bg-surface">
                    <v-row>
                        <v-col cols="12" md="4" sm="4">
                            <v-img
                                src="/src/assets/images/svgs/overReachedPlan.svg"
                                max-width="500"
                                alt="Over Reached Plan"
                                class="mx-auto my-4"
                            />
                        </v-col>
                        <v-col cols="12" md="8" sm="8">
                            <div class="px-4 tw-flex tw-h-full tw-flex-col">
                                <div class="mx-auto d-flex flex-column align-start">
                                    <h3 class="pa-2 text-h2">Parece que necesitas comprobantes de otro RUC, {{ store.user.name }}</h3>
                                    <h5 class="text-h5 pa-2">
                                        ¡No te preocupes! Prueba a seleccionar el Plan que más se adapte a tus necesidades
                                    </h5>
                                </div>
                                <div class="tw-grid tw-place-content-center tw-h-full">
                                    <VBtn color="primary" size="x-large" :to="{ name: 'my-subscription' }">QUIERO AUMENTAR MI PLAN 🚀</VBtn>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </div>
        </VDialog>

        <v-dialog max-width="700" v-model="showFormDialog">
            <form action="" @submit.prevent="onRucSubmit">
                <VCard>
                    <VCardTitle class="bg-primary">
                        <h1>Vamos a crear tu RUC</h1>
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
                                            Por favor, ingresa los datos solicitados como tienes tu cuenta en el SRI, nuestros servidores
                                            cuentan con cifrado de punta a punta para mayor seguridad.
                                        </p>
                                    </VCol>
                                    <VCol cols="12">
                                        <div class="tw-flex tw-flex-col tw-gap-1">
                                            <label for="">Nombre del dueño</label>
                                            <VTextField
                                                placeholder="Nombre"
                                                v-model="ruc.name"
                                                hide-details="auto"
                                                :error-messages="rucValidator.name.$errors.map((x) => x.$message.toString())"
                                            />
                                        </div>
                                    </VCol>
                                    <VCol cols="12">
                                        <div class="tw-flex tw-flex-col tw-gap-1">
                                            <label for="">Número de ruc</label>
                                            <VTextField
                                                placeholder="RUC"
                                                maxlength="13"
                                                v-model="ruc.ruc"
                                                hide-details="auto"
                                                :error-messages="rucValidator.ruc.$errors.map((x) => x.$message.toString())"
                                            />
                                        </div>
                                    </VCol>
                                    <VCol cols="12">
                                        <div class="tw-flex tw-flex-col tw-gap-1">
                                            <label for="">Contraseña del ruc</label>
                                            <VTextField
                                                placeholder="Contraseña"
                                                v-model="ruc.password"
                                                hide-details="auto"
                                                :error-messages="rucValidator.password.$errors.map((x) => x.$message.toString())"
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
                                @click="showFormDialog = false"
                                :loading="saveRucMutations.isPending.value"
                            >
                                cancelar
                            </VBtn>
                            <VBtn color="primary" variant="elevated" type="submit" :loading="saveRucMutations.isPending.value"
                                >Guardar Ruc</VBtn
                            >
                        </div>
                    </VCardActions>
                </VCard>
            </form>
        </v-dialog>
        <v-dialog max-width="700" persistent v-model="showWaitForMutationDialog">
            <WorkingSRIAnimation @close-dialog="handleCloseDialog" />
        </v-dialog>
    </VRow>
</template>

<style scoped></style>
