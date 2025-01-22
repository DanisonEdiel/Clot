<script setup lang="ts">
import useAccountUserMutation from '@/composables/users/useAccountUserMutation';
import type { User } from '@/models/User';
import { userStore } from '@/stores/useStore';
import { AxiosError } from 'axios';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { VCardActions } from 'vuetify/lib/components/index.mjs';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const router = useRouter();

interface props {
    account: User;
}

const props = defineProps<props>();
const showConfirm = ref(false);
const { mdAndUp } = useDisplay();
const confirmText = ref('');
const { companyUnsubscribeMutation } = useAccountUserMutation();
const showFormDialog = ref(false);

const onUnsubscribeCompanySubmit = () => {
    companyUnsubscribeMutation.mutate(props.account.id);
};

watch(companyUnsubscribeMutation.isError, () => {
    if (companyUnsubscribeMutation.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = companyUnsubscribeMutation.error.value as AxiosError<{
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
watch(companyUnsubscribeMutation.isSuccess, () => {
    if (companyUnsubscribeMutation.isSuccess.value) {
        toast.success('Salio de la empresa', {
            autoClose: 3000,
            closeButton: true
        });
        const store = userStore();
        store.logout();
        router.push({ name: 'login' });
    }
});
const isLoading = computed(() => companyUnsubscribeMutation.isPending.value);
</script>

<template>
    <v-card class="pb-5 tw-mt-3 tw-text-center tw-overflow-hidden" rounded="lg" flat>
        <v-card-title class="tw-mb-2 tw-w-full bg-primary">Salir de la empresa </v-card-title>
        <v-card-text class="pb-5">
            Antes de salir de tu empresa, considera usar la Verificación de autenticación en dos pasos para obtener
            más seguridad. De esa
            manera, podrás tener más confianza al realizar tus procedimientos.
        </v-card-text>
        <VCardActions>
            <v-col cols="12">
                <v-btn color="error" variant="flat" prepend-icon="mdi-alert-circle" @click="showConfirm = true">
                    Salir de la empresa
                </v-btn>
            </v-col>
        </VCardActions>

        <VDialog v-model="showConfirm" max-width="700">
            <VCard>
                <VCardTitle class="bg-primary">
                    <h1>¿Está seguro que desea salir de la empresa?</h1>
                </VCardTitle>
                <VCardText>
                    <VRow>
                        <VCol cols="0" md="6" v-if="mdAndUp" class="justify-center d-flex align-content-center">
                            <img src="/src/assets/images/usable/exitCompany.png" width="250" />
                        </VCol>
                        <VCol cols="0" md="6">
                            <v-row>
                                <VCol cols="12">
                                    <p class="tw-text-sm tw-text-gray-400">
                                        Si acepta salir de esta empresa después no podrás volver a acceder a menos que
                                        el administrador lo
                                        vuelva a invitar
                                    </p>
                                </VCol>
                                <VCol cols="12">
                                    <div class="tw-flex tw-flex-col tw-gap-1">
                                        <label for="">Ruc para eliminar</label>
                                        <VTextField placeholder="Contraseña" v-model="confirmText"
                                            hide-details="auto" />
                                    </div>
                                </VCol>
                            </v-row>
                        </VCol>
                    </VRow>

                </VCardText>
                <VCardActions>
                    <div class="tw-flex tw-w-full tw-justify-end tw-gap-2">
                        <VBtn flat color="borderColor" variant="elevated" @click="showConfirm = false"
                            :loading="isLoading">
                            cancelar
                        </VBtn>
                        <VBtn :disabled="confirmText != 'Borrar'" flat color="error" variant="outlined"
                            @click="onUnsubscribeCompanySubmit" :loading="companyUnsubscribeMutation.isPending.value">
                            Salir
                        </VBtn>
                    </div>
                </VCardActions>
            </VCard>
        </VDialog>
    </v-card>
</template>

<style scoped></style>
