<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { userStore } from '@/stores/useStore';
import useVuelidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { AxiosError } from 'axios';
import { toast } from 'vue3-toastify';
import useAdminLogin from '@/composables/admin/useAdminLogin';
import type { AdminLoginRequest } from '@/models/AdminLogin';

const AdminLoginRequest = ref<AdminLoginRequest>({} as AdminLoginRequest);

const router = useRouter();
const store = userStore();
const rules = {
    email: { required, email },
    password: { required }
};

const validator = useVuelidate(rules, AdminLoginRequest);
const showPassword = ref(false);

const { postLoginMutation } = useAdminLogin();
const onLoginSubmit = () => {
    validator.value.$validate();
    if (!validator.value.$error) {
        postLoginMutation.mutate(AdminLoginRequest.value);
    }
};

watch(postLoginMutation.isError, () => {
    if (postLoginMutation.isError.value) {
        let message = 'Ha ocurrido un error';
        let error = postLoginMutation.error.value as AxiosError<{
            message: string;
        }>;
        if (error.response?.data?.message) {
            message = error.response?.data?.message;
        }
        toast.error(message, {
            autoClose: 3000,
            closeButton: true
        });
    }
});

watch(postLoginMutation.isSuccess, () => {
    if (postLoginMutation.isSuccess.value) {
        let response = postLoginMutation.data.value;
        if (response) {
            store.setToken(response.token);
            store.setUser(response.admin);
            router.push({ name: 'home-admin' });
        }
    }
});

</script>

<template>
    <form @submit.prevent="onLoginSubmit" class="mt-5">
        <v-label class="pb-2 font-weight-semibold text-grey200">Email</v-label>
        <VTextField v-model="AdminLoginRequest.email" class="mb-8" required type="email" hide-details="auto"
            :error-messages="validator.email.$errors.map((x) => x.$message.toString())"></VTextField>
        <v-label class="pb-2 font-weight-semibold text-grey200">Contraseña</v-label>
        <VTextField v-model="AdminLoginRequest.password" required hide-details="auto" type="password" class="pwdInput"
            :error-messages="validator.password.$errors.map((x) => x.$message.toString())"></VTextField>

        <v-btn size="large" color="primary" class="mt-9" :loading="postLoginMutation.isPending.value" block
            type="submit" flat>Iniciar Sesión</v-btn>
    </form>
</template>
