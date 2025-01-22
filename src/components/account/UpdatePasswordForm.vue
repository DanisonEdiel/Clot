<script setup lang="ts">
import useAccountUserMutation from '@/composables/users/useAccountUserMutation';
import type { User } from '@/models/User';
import useVuelidate from '@vuelidate/core';
import { required, sameAs } from '@vuelidate/validators';
import { AxiosError } from 'axios';
import { computed, ref, watch } from 'vue';
import { toast } from 'vue3-toastify';

interface props {
    account: User;
}
interface changePasswordRequest {
    oldPassord: string;
    newPassword: string;
    confirmPassword: string;
}
const props = defineProps<props>();

const { updateAccountPasswordMutation } = useAccountUserMutation();

const request = ref<changePasswordRequest>({} as changePasswordRequest);
const computedConfirmPassword = computed(() => request.value.newPassword);
const rules = {
    oldPassord: { required },
    newPassword: { required },
    confirmPassword: {
        required,
        sameAs: sameAs(computedConfirmPassword)
    }
};
const validator = useVuelidate(rules, request);

const onPasswordUpdateSubmit = () => {
    validator.value.$validate();
    if (!validator.value.$error) {
        updateAccountPasswordMutation.mutate({
            newPassword: request.value.newPassword,
            oldPassword: request.value.oldPassord,
            userId: props.account.id
        });
    }
};

watch(updateAccountPasswordMutation.isError, () => {
    if (updateAccountPasswordMutation.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = updateAccountPasswordMutation.error.value as AxiosError<{
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
watch(updateAccountPasswordMutation.isSuccess, () => {
    if (updateAccountPasswordMutation.isSuccess.value) {
        toast.success('Contraseña actualizada 👌', {
            autoClose: 3000,
            closeButton: true
        });
        request.value = {} as changePasswordRequest;
        validator.value.$reset();
    }
});
</script>

<template>
    <form action="" @submit.prevent="onPasswordUpdateSubmit">
        <v-card class="pb-5 tw-mt-3 tw-text-center tw-overflow-hidden" rounded="lg" flat>
            <v-card-title class="tw-mb-3 tw-w-full bg-primary"> Actualizar contraseña </v-card-title>
            <VCardText>
                <VRow>
                    <VCol cols="12">
                        <VTextField
                            class="tw-mt-4"
                            label="Contraseña Actual"
                            v-model="request.oldPassord"
                            :error-messages="validator.oldPassord.$errors.map((x) => x.$message.toString())"
                        />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField
                            label="Nueva Contraseña"
                            v-model="request.newPassword"
                            :error-messages="validator.newPassword.$errors.map((x) => x.$message.toString())"
                        />
                    </VCol>
                    <VCol cols="12" md="6">
                        <VTextField
                            label="Confirma la Contraseña"
                            v-model="request.confirmPassword"
                            :error-messages="validator.confirmPassword.$errors.map((x) => x.$message.toString())"
                        />
                    </VCol>
                    <VCol cols="12">
                        <VBtn color="primary" type="submit" :loading="updateAccountPasswordMutation.isPending.value"
                            >Actualizar contraseña</VBtn
                        >
                    </VCol>
                </VRow>
            </VCardText>
        </v-card>
    </form>
</template>

<style scoped></style>
