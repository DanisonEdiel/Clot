<script setup lang="ts">
import useLogin from '@/composables/login/useLogin';
import useRucMutations from '@/composables/ruc/useRucMutations';
import { CreateAccountRequest } from '@/models/Login';
import { Role } from '@/models/Tenant';
import { userStore } from '@/stores/useStore';
import useVuelidate from '@vuelidate/core';
import { email, helpers, required } from '@vuelidate/validators';
import { AxiosError } from 'axios';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useDisplay } from 'vuetify/lib/framework.mjs';
const { mdAndUp } = useDisplay();
const router = useRouter();
const { createAccountMutation } = useLogin();
const { saveRucMutations } = useRucMutations();
const showFormDialog = ref(false);
const store = userStore();
const request = ref<CreateAccountRequest>({} as CreateAccountRequest);

const accountRules = {
    name: { required: helpers.withMessage('Name is required', required) },
    phone: { required: helpers.withMessage('Phone is required', required), numeric: helpers.withMessage('Solo se permiten números', required) },
    email: {
        required: helpers.withMessage('The email is required', required),
        email: helpers.withMessage('Type a valid email', email)
    },
    password: { required: helpers.withMessage('Password is required', required) }
};

const rucRules = {
    ruc: { required: helpers.withMessage('El ruc es requerido', required) },
    name: { required: helpers.withMessage('El ruc es requerido', required) },
    password: { required: helpers.withMessage('La ruc es requerido', required) }
};

const accountValidator = useVuelidate(accountRules, request);

const onAccountCreatedSubmit = () => {
    accountValidator.value.$validate();
    if (!accountValidator.value.$error) {
        createAccountMutation.mutate(request.value);
    }
};

const onRucSubmit = () => {

};

watch(createAccountMutation.isError, () => {
    if (createAccountMutation.isError.value) {
        let errorMessage = 'Error to create account';
        let error = createAccountMutation.error.value as AxiosError<{
            message: string;
        }>;
        if (error.response?.data?.message) {
            errorMessage = JSON.stringify(error.response?.data?.message);
        }
        toast.error(errorMessage, {
            autoClose: 3000
        });
    }
});

watch(createAccountMutation.isSuccess, () => {
    if (createAccountMutation.isSuccess.value) {
        let response = createAccountMutation.data.value;
        if (response) {
            store.setToken(response.token);
            store.setUser(response.user);
            if (response.tenants.length == 0) {
                toast.info('Usted no está asociado a ninguna empresa', {
                    autoClose: 3000,
                    closeButton: true
                });
                return;
            }
            if (response.tenants.length > 1) {
            } else {
                store.setTenantId(response.tenants[0].id);
                store.setRole({ id: 1, name: 'Admin', access: '' } as Role);
            }
            router.push({ name: 'home' });
        }
    }
});

watch(saveRucMutations.isError, () => {
    if (saveRucMutations.isError.value) {
        toast.error('Error al crear ruc 🥲', {
            autoClose: 3000
        });
    }
});
watch(saveRucMutations.isSuccess, () => {
    if (saveRucMutations.isSuccess.value) {
        showFormDialog.value = false;
    }
});

watch(showFormDialog, () => {
    if (!showFormDialog.value) {
    }
});
</script>

<template>
    <form action="" @submit.prevent="onAccountCreatedSubmit">
        <v-label class="pb-1 text-primary font-weight-medium">Name</v-label>
        <VTextField placeholder="Type name" v-model="request.name"
            :error-messages="accountValidator.name.$errors.map((x) => x.$message.toString())"></VTextField>
        <v-label class="pb-1 text-primary font-weight-medium">Email</v-label>
        <VTextField placeholder="example@clot.com" v-model="request.email"
            :error-messages="accountValidator.email.$errors.map((x) => x.$message.toString())"></VTextField>
        <v-label class="pb-1 text-primary font-weight-medium">Password</v-label>
        <VTextField variant="outlined" type="password" color="primary" placeholder="*********"
            :error-messages="accountValidator.password.$errors.map((x) => x.$message.toString())"
            v-model="request.password"></VTextField>
        <v-label class="pb-1 text-primary font-weight-medium">Phone</v-label>
        <VTextField placeholder="099-123-4567" v-model="request.phone"
            :error-messages="accountValidator.phone.$errors.map((x) => x.$message.toString())"></VTextField>
        <v-btn size="large" class="mt-2" color="primary" block type="submit" flat
            :loading="createAccountMutation.isPending.value">Register</v-btn>
    </form>
</template>
