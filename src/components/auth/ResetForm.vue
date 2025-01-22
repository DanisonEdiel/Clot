<script setup lang="ts">
import { ref, watch } from 'vue';
import Logo from '@/layouts/full/logo/Logo.vue';
import useVuelidate from '@vuelidate/core';
import { useRouter } from 'vue-router';
import { required } from '@vuelidate/validators';
import useAccountUserMutation from '@/composables/users/useAccountUserMutation';
import { toast } from 'vue3-toastify';
import { AxiosError } from 'axios';

const email = ref('');

const router = useRouter();
const rules = {
    email: { required, email }
};

const request = ref();
const validator = useVuelidate(rules, { email: request });
const { passwordResetMutation } = useAccountUserMutation();

const onResetPassowrdSubmit = () => {
    validator.value.$validate();
    if (!validator.value.$error) {
        passwordResetMutation.mutate({ email: request.value });
    }
};

watch(passwordResetMutation.isError, () => {
    if (passwordResetMutation.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = passwordResetMutation.error.value as AxiosError<{
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

watch(passwordResetMutation.isSuccess, () => {
    if (passwordResetMutation.isSuccess.value) {
        toast.success('Se envió un correo electrónico', {
            autoClose: 3000,
            closeButton: true
        });
    }
});

const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);
</script>
<template>
    <form @submit.prevent="onResetPassowrdSubmit" class="mt-8 mt-sm-13">
        <v-label class="pb-2 text-subtitle-1 font-weight-semibold text-lightText heading" placeholder="info@example.com"
            >Email address</v-label
        >
        <VTextField
            placeholder="example@tygor.com"
            v-model="request"
            :error-messages="validator.email.$errors.map((x) => x.$message.toString())"
        />
        <v-btn type="submit" size="large" color="lightprimary" flat block :loading="passwordResetMutation.isPending.value"
            >Recovery password</v-btn
        >
    </form>
</template>
