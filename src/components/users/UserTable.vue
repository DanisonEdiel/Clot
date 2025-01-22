<script setup lang="ts">
import useUserMutations from '@/composables/users/useUserMutations';
import type { AdminUser } from '@/models/AdminUsers';
import { userStore } from '@/stores/useStore';
import useVuelidate from '@vuelidate/core';
import { email, helpers, required } from '@vuelidate/validators';
import type { AxiosError } from 'axios';
import { ref, watch } from 'vue';
import { useDisplay } from 'vuetify';
import { VDataTable } from 'vuetify/lib/components/index.mjs';
import Swal from 'sweetalert2';


const { lgAndUp } = useDisplay();

const searchValue = ref('');
const showAddDialog = ref(false);

const { saveUserMutation, deleteUserMutation } = useUserMutations();
interface props {
    users: AdminUser[];
    isLoading: boolean;
    hasError: boolean;
}
const props = defineProps<props>();
const onDelete = (id: number) => {
    Swal.fire({
        title: '¿Está seguro?',
        text: '¡Tendrás que volver a invitar al usuario si lo quieres en tu empresa!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!',
        cancelButtonText: 'No, cancelar!'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteUserMutation.mutate(id);
        }
    });
};
const emit = defineEmits(['add-success', 'delete-success']);

const headers = [
    { title: 'Nombre', key: 'name' },
    { title: 'Rol', key: 'role_name' },
    { title: 'Eliminar', key: 'action', width: 50 }
];

const userToAdd = ref<AdminUser>({} as AdminUser);

const rules = {
    name: {
        required: helpers.withMessage('El Nombre es requerido', required)
    },
    email: {
        required: helpers.withMessage('El Email es requerido', required),
        email: helpers.withMessage('El Email es requerido', email)
    },
    password: {
        required: helpers.withMessage('La contraseña es requerido', required)
    }
};

const validator = useVuelidate(rules, userToAdd);

const onUserSubmit = () => {
    validator.value.$validate();
    if (!validator.value.$error) {
        const store = userStore();
        saveUserMutation.mutate(userToAdd.value);
    }
};

watch(saveUserMutation.isError, () => {
    if (saveUserMutation.isError.value) {
        let error = saveUserMutation.error.value as AxiosError<any>;
        
    }
});

watch(saveUserMutation.isSuccess, () => {
    if (saveUserMutation.isSuccess.value) {
        let response = saveUserMutation.data.value;
        if (response) {
            emit('add-success', response);
        }
        userToAdd.value = {} as AdminUser;
        validator.value.$reset();
        showAddDialog.value = false;
    }
});

watch(deleteUserMutation.isError, () => {
    if (deleteUserMutation.isError.value) {
        let error = deleteUserMutation.error.value as AxiosError<any>;
        
    }
});

watch(deleteUserMutation.isSuccess, () => {
    if (deleteUserMutation.isSuccess.value) {
        let response = deleteUserMutation.variables.value;
        if (response) {
            emit('delete-success', response);
        }
    }
});
</script>
<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field
                density="compact"
                v-model="searchValue"
                append-inner-icon="mdi-magnify"
                label="Buscar Usuarios"
                hide-details
                variant="outlined"
            ></v-text-field>
        </v-col>
        <v-col cols="12" lg="8" md="6" class="text-right">
            <v-btn color="primary" v-bind="props" flat class="ml-auto" @click="showAddDialog = true">
                <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Agregar Usuario
            </v-btn>
            <v-dialog max-width="800" v-model="showAddDialog">
                <v-card>
                    <v-card-title class="pa-4 bg-primary">
                        <span class="text-white title">Agregar Usuario</span>
                    </v-card-title>

                    <v-card-text>
                        <form ref="form" @submit.prevent="onUserSubmit">
                            <div class="d-flex mainbox">
                                <div class="right-part tw-p-3">
                                    <p class="tw-italic tw-p-6">
                                        A continuación, ingresa el correo del usuario al que deseas agregar para administrar la organización, se enviará un
                                        correo electrónico automáticamente.
                                    </p>
                                    <v-divider class="d-lg-none d-block" />
                                    <slot name="rightpart">
                                        <div class="tw-px-10">
                                            <v-text-field
                                                variant="outlined"
                                                hide-details="auto"
                                                label="Nombre"
                                                class="tw-py-2"
                                                v-model="userToAdd.name"
                                                :error-messages="validator.name.$errors.map((x) => x.$message.toString())"
                                            />
                                            <v-text-field
                                                variant="outlined"
                                                hide-details="auto"
                                                label="Correo"
                                                type="email"
                                                :error-messages="validator.email.$errors.map((x) => x.$message.toString())"
                                                class="tw-py-2"
                                                v-model="userToAdd.email"
                                            />
                                            <v-text-field
                                                variant="outlined"
                                                hide-details="auto"
                                                label="Contraseña"
                                                class="tw-py-2"
                                                :error-messages="validator.password.$errors.map((x) => x.$message.toString())"
                                                v-model="userToAdd.password"
                                            />
                                        </div>
                                    </slot>
                                </div>
                            </div>
                        </form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn
                            color="error"
                            width="200px"
                            size="large"
                            variant="flat"
                            :loading="saveUserMutation.isPending.value"
                            @click="showAddDialog = false"
                            >Cancelar</v-btn
                        >
                        <v-btn
                            color="primary"
                            width="200px"
                            size="large"
                            variant="flat"
                            @click="onUserSubmit"
                            :loading="saveUserMutation.isPending.value"
                            >Invitar</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <VDataTable :headers="headers" :items="users" :loading="props.isLoading" class="mt-5">
        <template v-slot:item.name="{ item }">
            <div class="d-flex align-center"> 
                <div class="ml-5">
                    <h4 class="text-subtitle-1 text-no-wrap">{{ item.name }}</h4>
                    <span class="mt-1 text-subtitle-1 d-block textSecondary">{{ item.email }}</span>
                </div>
            </div>
        </template>
        <template v-slot:item.action="{ item }">
            <div class="d-flex align-center">
                <v-tooltip text="Delete">
                    <template v-slot:activator="{ props }">
                        <v-btn icon flat v-bind="props" @click="onDelete(item.id)" :loading="deleteUserMutation.isPending.value">
                            <TrashIcon stroke-width="1.5" size="20" class="text-error" />
                        </v-btn>
                    </template>
                </v-tooltip>
            </div>
        </template>
    </VDataTable>
</template>

<style lang="scss">
.mainbox {
    position: relative;
    overflow: hidden;
}

.left-part {
    width: 320px;
    border-right: 1px solid rgb(var(--v-theme-borderColor));
    min-height: 200px;
    transition: 0.1s ease-in;
    flex-shrink: 0;
}

.v-theme--light {
    .left-part {
        background: white;
    }
}

.v-theme--dark {
    .left-part {
        background: #2b2b2b;
    }
}

.right-part {
    width: 100%;
    min-height: 200px;
    position: relative;
}
</style>
