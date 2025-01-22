<script setup lang="ts">
import useUserMutation from '@/composables/users/useUserMutations';
import useUsers from '@/composables/users/useUsers';
import { User } from '@/models/User';
import useVuelidate from '@vuelidate/core';
import { email, helpers, required } from '@vuelidate/validators';
import { ref, watch } from 'vue';
import { toast } from 'vue3-toastify';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import UserItem from './UserItem.vue';
import { AxiosError } from 'axios';

const { isUsersLoading, refetch, userHasError, users, idlUsers } = useUsers();
const { saveUserMutation, deleteUserMutation } = useUserMutation();
const user = ref<User>({} as User);

const search = ref();
const showFormDialog = ref(false);
const showDeleteDialog = ref(false);
const { mdAndUp } = useDisplay();
const deleteInputConfirm = ref();

const onUserSelected = (selectedUser: User) => {
    user.value = selectedUser;
    showDeleteDialog.value = true;
};

const onUserDeleteSubmit = () => {
    deleteUserMutation.mutate(user.value.user_id);
};

watch(search, () => {
    if (search.value) {
        users.value = idlUsers.value.filter((x) => x.name.includes(search.value) || x.email.includes(search.value));
    } else {
        users.value = idlUsers.value;
    }
});

watch(saveUserMutation.isError, () => {
    if (saveUserMutation.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = saveUserMutation.error.value as AxiosError<{
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
watch(saveUserMutation.isSuccess, () => {
    if (saveUserMutation.isSuccess.value) {
        toast.success('Usuario guardado', {
            autoClose: 3000,
            closeButton: true
        });
        showFormDialog.value = false;
        user.value = {} as User;
        userValidator.value.$reset();
        refetch();
    }
});

watch(deleteUserMutation.isError, () => {
    if (deleteUserMutation.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = deleteUserMutation.error.value as AxiosError<{
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
watch(deleteUserMutation.isSuccess, () => {
    if (deleteUserMutation.isSuccess.value) {
        toast.success('Usuario eliminado 👌', {
            autoClose: 3000,
            closeButton: true
        });
        showDeleteDialog.value = false;
        deleteInputConfirm.value = null;
        user.value = {} as User;
        refetch();
    }
});

const userRules = {
    name: { required: helpers.withMessage('El Usuario es requerido', required) },
    email: {
        email: helpers.withMessage('El Usuario es requerido', email),
        required: helpers.withMessage('El Usuario es requerido', required)
    }
};

const userValidator = useVuelidate(userRules, user);
const onUserSubmit = () => {
    userValidator.value.$validate();
    if (!userValidator.value.$error) {
        saveUserMutation.mutate(user.value);
    }
};
</script>

<template>
    <VRow v-if="isUsersLoading">
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
                    placeholder="Buscar Usuario"
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
                <VBtn color="primary">Añadir Usuario</VBtn>
            </div>
        </VCol>
        <VCol cols="6" md="4" v-for="user in 3">
            <v-skeleton-loader type="card" color="borderColor"></v-skeleton-loader>
        </VCol>
    </VRow>
    <VRow v-else-if="userHasError">
        <VCol>
            <p>Error de servidor</p>
        </VCol>
    </VRow>
    <VRow v-else>
        <VCol cols="12"> </VCol>
        <VCol cols="12" md="12" lg="4">
            <div class="tw-flex tw-h-full tw-justify-start tw-items-center">
                <h1 class="text-primary tw-text-lg md:tw-text-xl">
                    Usuarios Creados <span class="tw-px-2 tw-py-1 tw-rounded-md bg-secondary">{{ users.length }}</span>
                </h1>
            </div>
        </VCol>
        <VCol cols="12" md="6" lg="4">
            <div class="tw-flex tw-h-full tw-justify-center tw-items-center">
                <VTextField
                    prepend-inner-icon="mdi-magnify"
                    placeholder="Buscar Usuario"
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
                <VBtn color="primary" @click="showFormDialog = true">Añadir Usuario</VBtn>
            </div>
        </VCol>
        <VCol cols="6" md="4" v-for="user in users">
            <UserItem :user="user" @user-select="onUserSelected" />
        </VCol>
        <VDialog v-model="showFormDialog" max-width="600px">
            <form action="" @submit.prevent="onUserSubmit">
                <VCard>
                    <VCardTitle class="bg-primary">
                        <h1>Creemos un Usuario</h1>
                    </VCardTitle>
                    <VCardText>
                        <VRow>
                            <VCol cols="0" md="6" v-if="mdAndUp">
                                <img src="/src/assets/images/breadcrumb/emailSv.png" />
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
                                            <label for="">Nombre de usuario</label>
                                            <VTextField
                                                placeholder="Nombre"
                                                hide-details="auto"
                                                v-model="user.name"
                                                :error-messages="userValidator.name.$errors.map((x) => x.$message.toString())"
                                            />
                                        </div>
                                    </VCol>
                                    <VCol cols="12">
                                        <div class="tw-flex tw-flex-col tw-gap-1">
                                            <label for="">Correo electrónico del Usuario</label>
                                            <VTextField
                                                placeholder="example@tygor.com"
                                                hide-details="auto"
                                                v-model="user.email"
                                                :error-messages="userValidator.email.$errors.map((x) => x.$message.toString())"
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
                                :loading="saveUserMutation.isPending.value"
                            >
                                Cancelar
                            </VBtn>
                            <VBtn color="primary" variant="elevated" type="submit" :loading="saveUserMutation.isPending.value"
                                >Guardar Usuario</VBtn
                            >
                        </div>
                    </VCardActions>
                </VCard>
            </form>
        </VDialog>
        <VDialog v-model="showDeleteDialog" max-width="600px">
            <form action="" @submit.prevent="onUserDeleteSubmit">
                <VCard>
                    <VCardTitle class="bg-primary tw-flex tw-items-center tw-gap-2">
                        <VIcon>mdi-trash-can</VIcon>
                        <h1>¿Desea eliminar el usuario?</h1>
                    </VCardTitle>
                    <VCardText>
                        <VRow>
                            <VCol cols="0" md="6" v-if="mdAndUp">
                                <img src="/src/assets/images/usable/delete.svg" />
                            </VCol>
                            <VCol cols="0" md="6">
                                <VRow>
                                    <VCol cols="12">
                                        <p class="tw-text-sm tw-text-gray-400">
                                            En caso que desee eliminar el usuario, escriba el e-mail del usuario "{{ user.email }}" a
                                            continuación. Esta acción es <strong>IRREVERSIBLE</strong>.
                                        </p>
                                    </VCol>
                                    <VCol cols="12">
                                        <div class="tw-flex tw-flex-col tw-gap-1">
                                            <label for="">Email del usuario</label>
                                            <VTextField
                                                :placeholder="user.email"
                                                v-model="deleteInputConfirm"
                                                hide-details="auto"
                                                :error-messages="userValidator.name.$errors.map((x) => x.$message.toString())"
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
                                @click="showDeleteDialog = false"
                                :loading="deleteUserMutation.isPending.value"
                            >
                                Cancelar
                            </VBtn>
                            <VBtn
                                color="error"
                                variant="elevated"
                                :disabled="deleteInputConfirm != user.email"
                                type="submit"
                                :loading="deleteUserMutation.isPending.value"
                            >
                                <VIcon left>mdi-trash-can</VIcon>
                                Eliminar
                            </VBtn>
                        </div>
                    </VCardActions>
                </VCard>
            </form>
        </VDialog>
    </VRow>
</template>

<style scoped></style>
