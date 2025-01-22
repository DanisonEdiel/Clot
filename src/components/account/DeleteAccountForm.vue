<script setup lang="ts">
import useAccountUserMutation from '@/composables/users/useAccountUserMutation';
import type { User } from '@/models/User';
import { userStore } from '@/stores/useStore';
import { AxiosError } from 'axios';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useDisplay } from 'vuetify/lib/framework.mjs';
const { mdAndUp } = useDisplay();

const router = useRouter();

interface props {
    account: User;
}

const props = defineProps<props>();
const showConfirm = ref(false);
const confirmText = ref('');
const { deleteAccountMutation } = useAccountUserMutation();

const onDeleteAccountSubmit = () => {
    deleteAccountMutation.mutate(props.account.id);
};

const isLoading = computed(() => deleteAccountMutation.isPending.value);

watch(deleteAccountMutation.isError, () => {
    if (deleteAccountMutation.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = deleteAccountMutation.error.value as AxiosError<{
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
watch(deleteAccountMutation.isSuccess, () => {
    if (deleteAccountMutation.isSuccess.value) {
        toast.success('Salio de la empresa', {
            autoClose: 3000,
            closeButton: true
        });
        const store = userStore();
        store.logout();
        router.push({ name: 'login' });
    }
});
</script>

<template>
    <v-card class="pb-5 tw-mt-3 tw-text-center tw-overflow-hidden" rounded="lg" flat>
        <v-card-title class="tw-w-full tw-mb-2 bg-primary">ELIMINAR CUENTA</v-card-title>
        <p class="tw-mb-4 tw-w-full">
            Eliminar su cuenta es totalmente irreversible, esto quiere decir que en el caso que desee de nuevo su cuenta tendrá que volver a
            crearla.
        </p>
        <v-btn color="error" variant="flat" prepend-icon="mdi-alert-circle" @click="showConfirm = true"> ELIMINAR CUENTA </v-btn>
        <VDialog v-model="showConfirm" max-width="700">
            <VCard>
                <VCardTitle class="bg-primary">
                    <h1>¿Está seguro que desea eliminar su cuenta?</h1>
                </VCardTitle>
                <VCardText>
                    <VRow>
                        <VCol cols="0" md="6" v-if="mdAndUp">
                            <img src="/src/assets/images/usable/deleteAccount.png" width="250" />
                        </VCol>
                        <VCol cols="0" md="6">
                            <vRow>
                                <VCol cols="12">
                                    <p class="tw-text-sm tw-text-gray-400">
                                        Si acepta eliminar su cuenta no podrá acceder a menos que el administrador lo vuelva a invitar, en
                                        caso de ser administrador, para eliminar su cuenta digite <strong>Borrar</strong> en el sigueinte
                                        campo y acepte
                                    </p>
                                </VCol>
                                <VCol cols="12">
                                    <div class="tw-flex tw-flex-col tw-gap-1">
                                        <label for="">Cuenta a eliminar</label>
                                        <VTextField v-model="confirmText" />
                                    </div>
                                </VCol>
                            </vRow>
                        </VCol>
                    </VRow>
                </VCardText>
                <VCardActions>
                    <div class="tw-flex tw-w-full tw-justify-end tw-gap-2">
                        <VBtn flat color="borderColor" variant="elevated" @click="showConfirm = false" :loading="isLoading">
                            Cancelar
                        </VBtn>
                        <VBtn
                            :disabled="confirmText != 'Borrar'"
                            flat
                            color="error"
                            variant="outlined"
                            @click="onDeleteAccountSubmit"
                            :loading="deleteAccountMutation.isPending.value"
                        >
                            Eliminar Cuenta
                        </VBtn>
                    </div>
                </VCardActions>
            </VCard>
        </VDialog>
    </v-card>
</template>

<style scoped></style>
