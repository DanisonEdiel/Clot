<script setup lang="ts">
import { ref, watch } from 'vue';
import { LoginRequest } from '@/models/Login';
import { useRouter } from 'vue-router';
import { userStore } from '@/stores/useStore';
import useLogin from '@/composables/login/useLogin';
import useVuelidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { AxiosError } from 'axios';
import { toast } from 'vue3-toastify';
import { Tenant } from '@/models/Tenant';
import { VBtn, VSelect } from 'vuetify/lib/components/index.mjs';

const loginRequest = ref<LoginRequest>({} as LoginRequest);
const companies = ref<Tenant[]>([]);
const router = useRouter();
const store = userStore();
const selectedCompany = ref<Tenant>();
const rules = {
    email: { required, email },
    password: { required }
};

const validator = useVuelidate(rules, loginRequest);
const showPassword = ref(false);

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const { postLoginMutation } = useLogin();
const onLoginSubmit = () => {
    validator.value.$validate();
    if (!validator.value.$error) {
        postLoginMutation.mutate(loginRequest.value);
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
        companies.value = [];
        let response = postLoginMutation.data.value;
        if (response) {
            store.setToken(response.token);
            store.setUser(response.user);
            if (response.tenants.length == 0) {
                toast.info('Usted no se encuentra asociado a ninguna empresa', {
                    autoClose: 3000,
                    closeButton: true
                });
                return;
            }
            if (response.tenants.length > 1) {
                companies.value = response.tenants;
                store.setCompanies(companies.value);
                store.companies;
            } else {
                store.setTenantId(response.user.tenant_user[0].tenant_id);
                store.setRole(response.user.tenant_user[0].role);
                router.push({ name: 'home' });
            }
        }
    }
});

const onCompanySelected = () => {
    if (selectedCompany.value) {
        store.setTenantId(selectedCompany.value.id);
        router.push({ name: 'home' });
    }
};
</script>

<template>
    <form @submit.prevent="onLoginSubmit" class="mt-5" v-auto-animate>
        <v-label class="pb-2 font-weight-semibold text-grey200">Email</v-label>
        <VTextField v-model="loginRequest.email" class="mb-8" required type="email" hide-details="auto"
            :error-messages="validator.email.$errors.map((x) => x.$message.toString())"></VTextField>
        <v-label class="pb-2 font-weight-semibold text-grey200">Contraseña</v-label>
        <VTextField v-model="loginRequest.password" required hide-details="auto"
            :type="showPassword ? 'text' : 'password'" class="pwdInput" :class="companies.length > 0 ? 'mb-6' : ''"
            :error-messages="validator.password.$errors.map((x) => x.$message.toString())">
            <template #append-inner>
                <v-icon class="cursor-pointer" @click="togglePasswordVisibility">
                    {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
                </v-icon>
            </template>
        </VTextField>
        <v-label v-if="companies.length > 0" class="pb-2 font-weight-semibold text-grey200">Empresa</v-label>
        <div class="tw-flex tw-gap-1" v-if="companies.length > 0" v-auto-animate>
            <VSelect hide-details="auto" :items="companies" return-object placeholder="Dueño de la empresa"
                item-title="owner.name" v-model="selectedCompany" />
            <VBtn color="primary" height="41" @click="onCompanySelected" v-if="selectedCompany">Entrar</VBtn>
        </div>
        <div class="ml-sm-auto">
            <RouterLink to="/auth/reset-password" class="text-primary text-decoration-none font-weight-medium">
                ¿Perdiste la contraseña?</RouterLink>
        </div>
        <v-btn size="large" color="primary" class="mt-9" :loading="postLoginMutation.isPending.value" block
            type="submit" flat>
            Iniciar Sesión
        </v-btn>
    </form>
</template>
