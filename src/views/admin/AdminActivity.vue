<script setup lang="ts">
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UserTable from '@/components/users/UserTable.vue';
import useAdminDashboard from '@/composables/dashboard/useAdminDashboard';

import type { AdminUser } from '@/models/AdminUsers';
import { ref } from 'vue';

const page = ref({ title: 'Actividad' });
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
import { useRoute } from 'vue-router';
const route = useRoute()


</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <!-- <v-card-text>
            <v-progress-circular v-if="isDashboardLoading" indeterminate color="blue-500" />
            <template v-else-if="dashboardHasError">
                <v-alert icon="error" text="Ha ocurrido un error al cargar la información." />
            </template>
            <template v-else>
            </template>
        </v-card-text> -->
    </v-card>
</template>

<style scoped></style>
