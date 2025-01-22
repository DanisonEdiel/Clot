<script setup lang="ts">
import useLogin from '@/composables/login/useLogin';
import useRucMutations from '@/composables/ruc/useRucMutations';
import { CreateAccountRequest } from '@/models/Login';
import { Ruc } from '@/models/Ruc';
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
const ruc = ref<Ruc>({} as Ruc);

const accountRules = {
    name: { required: helpers.withMessage('El nombre es requerido', required) },
    phone: { required: helpers.withMessage('El teléfono es requerido', required), numeric: helpers.withMessage('Solo se permiten números', required) },
    email: {
        required: helpers.withMessage('El email es requerido', required),
        email: helpers.withMessage('Ingrese un email válido', email)
    },
    password: { required: helpers.withMessage('La contraseña es requerida', required) }
};

const rucRules = {
    ruc: { required: helpers.withMessage('El ruc es requerido', required) },
    name: { required: helpers.withMessage('El ruc es requerido', required) },
    password: { required: helpers.withMessage('La ruc es requerido', required) }
};

const accountValidator = useVuelidate(accountRules, request);
const rucValidator = useVuelidate(rucRules, ruc);

const onAccountCreatedSubmit = () => {
    accountValidator.value.$validate();
    if (!accountValidator.value.$error) {
        createAccountMutation.mutate(request.value);
    }
};

const onRucSubmit = () => {
    rucValidator.value.$validate();
    if (!rucValidator.value.$error) {
        saveRucMutations.mutate(ruc.value);
    }
};

watch(createAccountMutation.isError, () => {
    if (createAccountMutation.isError.value) {
        let errorMessage = 'Error al crear la cuenta';
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
            router.push({ name: 'welcome-page' });
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
        <v-label class="pb-1 text-primary font-weight-medium">Nombre</v-label>
        <VTextField
            placeholder="Ingresa tu nombre"
            v-model="request.name"
            :error-messages="accountValidator.name.$errors.map((x) => x.$message.toString())"
        ></VTextField>
        <v-label class="pb-1 text-primary font-weight-medium">Email</v-label>
        <VTextField
            placeholder="example@tygor.com"
            v-model="request.email"
            :error-messages="accountValidator.email.$errors.map((x) => x.$message.toString())"
        ></VTextField>
        <v-label class="pb-1 text-primary font-weight-medium">Contraseña</v-label>
        <VTextField
        variant="outlined"
        type="password"
        color="primary"
        placeholder="*********"
        :error-messages="accountValidator.password.$errors.map((x) => x.$message.toString())"
        v-model="request.password"
        ></VTextField>
        <v-label class="pb-1 text-primary font-weight-medium">Teléfono</v-label>
        <VTextField
            placeholder="099-123-4567"
            v-model="request.phone"
            :error-messages="accountValidator.phone.$errors.map((x) => x.$message.toString())"
        ></VTextField>
        <v-btn size="large" class="mt-2" color="primary" block type="submit" flat :loading="createAccountMutation.isPending.value"
            >Regístrate</v-btn
        >
    </form>
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
                            Cancelar
                        </VBtn>
                        <VBtn color="primary" variant="elevated" type="submit" :loading="saveRucMutations.isPending.value"
                            >Guardar Ruc</VBtn
                        >
                    </div>
                </VCardActions>
            </VCard>
        </form>
    </v-dialog>
</template>
