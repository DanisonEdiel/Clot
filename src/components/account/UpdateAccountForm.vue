<script setup lang="ts">
import useAccountUserMutation from '@/composables/users/useAccountUserMutation';
import type { User } from '@/models/User';
import { onlyNumber } from '@/service/InputValidator';
import { AxiosError } from 'axios';
import { watch } from 'vue';
import { toast } from 'vue3-toastify';

interface props {
    account: User;
}

const props = defineProps<props>();
const { updateUserAccountMutation } = useAccountUserMutation();
const onAccountupdateSubmit = () => {
    updateUserAccountMutation.mutate(props.account);
};

watch(updateUserAccountMutation.isError, () => {
    if (updateUserAccountMutation.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = updateUserAccountMutation.error.value as AxiosError<{
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
watch(updateUserAccountMutation.isSuccess, () => {
    if (updateUserAccountMutation.isSuccess.value) {
        toast.success('Cuenta actualizada 👌', {
            autoClose: 3000,
            closeButton: true
        });
    }
});
</script>

<template>
    <form action="" @submit.prevent="onAccountupdateSubmit">
        <v-card class="pb-5 tw-mt-3 tw-text-center tw-overflow-hidden" rounded="lg" flat>
            <v-card-title class="tw-mb-2 tw-w-full bg-primary"> Datos personales </v-card-title>
            <v-card-subtitle class="tw-mt-4 tw-w-full"> A continuación podrás actualizar tus datos </v-card-subtitle>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field label="Nombre completo" placeholder="¿Cuál es tu nombre?" v-model="account.name" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field label="Teléfono" v-model="account.phone" @keydown="onlyNumber($event)" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field label="Provincia" v-model="account.city" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field label="Ciudad" v-model="account.state" />
                    </v-col>
                    <v-col cols="12">
                        <v-textarea density="compact" variant="outlined" label="Dirección" rows="3" v-model="account.address" />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-col cols="12">
                <v-btn color="primary" type="submit" :loading="updateUserAccountMutation.isPending.value"> Actualizar</v-btn>
            </v-col>
        </v-card>
    </form>
</template>

<style scoped></style>
