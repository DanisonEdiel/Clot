<script setup lang="ts">
import { Icon } from '@iconify/vue';
import useAdminDashboard from '@/composables/dashboard/useAdminDashboard';
import usePlans from '@/composables/plans/usePlans';

const { plans } = usePlans();
const { dashboardData,dashboardHasError,isDashboardLoading } = useAdminDashboard();

</script>

<template>
    <v-card elevation="10" class="overflow-hidden">
        <v-card-item>
            <div class="gap-4 tw-flex-wrap d-flex">
                <div class="flex-1-0 primary-gradient">
                    <v-sheet class="px-3 py-8 text-center rounded-md primary-gradient">
                        <v-avatar size="48" color="primary" class="mb-3 rounded-md">
                            <Icon icon="solar:buildings-3-broken" height="25" />
                        </v-avatar>
                        <h2 class="mb-1 text-h3">Total Empresas</h2>
                        <h3 class="mb-5 text-h3 heading">{{dashboardData.length}}</h3>
                    </v-sheet>
                </div>
                <div class="flex-1-0 success-gradient">
                    <v-sheet class="px-3 py-8 text-center rounded-md success-gradient">
                        <v-avatar size="48" color="success" class="mb-3 rounded-md">
                            <Icon icon="solar:widget-linear" height="25" />
                        </v-avatar>
                        <h2 class="mb-1 text-h3">Número de Suscripciones</h2>
                        <h3 class="mb-5 text-h3 heading">{{plans.length}}</h3>
                    </v-sheet>
                </div>
            </div>
        </v-card-item>
    </v-card>
</template>

<style scoped></style>
