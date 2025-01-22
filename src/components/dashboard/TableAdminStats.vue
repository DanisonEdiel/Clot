<script setup lang="ts">
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { VDataTable, VProgressCircular } from 'vuetify/lib/components/index.mjs';
import moment from 'moment';

import useAdminDashboard from '@/composables/dashboard/useAdminDashboard';
import usePlans from '@/composables/plans/usePlans';
import { Plans } from '@/models/Plans';
import { Tenant } from '@/models/Tenant';
import ShowPlan from '@/views/admin/ShowPlan.vue';
import { router } from '@/router';

const { dashboardData, dashboardHasError, isDashboardLoading } = useAdminDashboard();
const selectedPlan = ref<Plans | null>(null);
const selectedTenant = ref<Tenant | null>(null);
const search = ref();
const { plans } = usePlans();
const selectedCompany = ref<any>(null);

const headers = [
    { title: 'Creación', value: 'company.created_at', class: 'my-header-style' },
    { title: 'Nombre', value: 'company.owner.name', class: 'my-header-style' },
    { title: 'Teléfono', value: 'company.owner.phone' },
    { title: 'RUCs Creados', value: 'rucs' },
    { title: 'Doc Disponibles', value: 'vouchers' },
    { title: 'Descargados SRI', value: 'downloadedVouchers' },
    { title: 'Plan', value: 'plan' },
    { title: 'Acciones', value: 'actions' },
];

const showPlanView = (id:string) => {
    router.push({ name: 'change-plan', params: { id: id }})
};


const tab = ref('Factura');
</script>
<template>
    <v-card elevation="10" class="revenue-products">
        <v-card-item class="pb-4">
            <div class="gap-3 d-flex align-center justify-space-between">
                <v-card-title>
                    <h1 class="text-h5">Empresas registradas</h1>
                </v-card-title>
            </div>
            <div class="mt-4 tw-w-full tw-flex tw-justify-center tw-items-center tw-h-36" v-if="isDashboardLoading">
                <VProgressCircular indeterminate />
            </div>
            <div class="mt-4 tw-w-full tw-flex tw-justify-center tw-items-center tw-h-36" v-else-if="dashboardHasError">
                <p class="tw-font-semibold">Error en el servidor 🥲</p>
            </div>
            <div class="mt-4" v-else>
                <v-data-table class="border rounded-md datatabels" :headers="headers" :items="dashboardData"
                    :search="search"
                    :no-data-text="dashboardHasError ? 'Error en el servidor 🥲' : 'No existen empresas'">
                    <template v-slot:top>
                        <v-toolbar class="bg-surface tw-px-3" flat v-motion :initial="{ opacity: 0, x: -10 }"
                            :enter="{ opacity: 1, x: 0 }" :delay="200" :duration="250">
                            <VTextField hide-details placeholder="Buscar Empresa" prepend-inner-icon="mdi-magnify"
                                v-model="search" class="tw-max-w-[400px]" />
                            <v-spacer></v-spacer>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.company.created_at="{ item }">
                        <div class="tw-flex tw-gap-2 tw-items-center">
                            <p>{{ moment(item.company.created_at).format('YYYY-MM-DD') }}</p>
                        </div>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <div class="gap-3 d-flex">
                            <VBtn variant="text" size="x-small" icon @click="showPlanView(item.company.id)">
                                <Icon icon="material-symbols:edit-square-outline" height="20"
                                    class="cursor-pointer text-success" size="small" />
                            </VBtn>
                        </div>
                    </template>
                </v-data-table>
            </div>
        </v-card-item>

    </v-card>
</template>
