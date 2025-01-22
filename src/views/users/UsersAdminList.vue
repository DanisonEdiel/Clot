<script setup lang="ts">
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UserTable from '@/components/users/UserTable.vue';
import useAdminUsers from '@/composables/users/useAdminUsers';
import type { AdminUser } from '@/models/AdminUsers';
import { ref } from 'vue';

const page = ref({ title: 'Administradores' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '/'
    },
    {
        text: 'Dashboard',
        disabled: true,
        href: '#'
    }
]);

const { users, isUsersLoading, userHasError } = useAdminUsers();
const onUserUpdate = (newUser: AdminUser) => {
    users.value.push(newUser);
};

const onDeleteSuccess = (id: number) => {
    users.value = users.value.filter((x) => x.id != id);
};
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <UserTable
                :users="users"
                :is-loading="isUsersLoading"
                :has-error="userHasError"
                @add-success="onUserUpdate"
                @delete-success="onDeleteSuccess"
            />
        </v-card-text>
    </v-card>
</template>

<style scoped></style>
