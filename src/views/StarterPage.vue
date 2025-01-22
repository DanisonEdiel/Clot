<script setup lang="ts">
import ProifileCard from '@/components/dashboard/AddCard.vue';
import SubscriptionCard from '@/components/dashboard/AvailableDocuments.vue';
import RevenueComprobants from '@/components/dashboard/RevenueComprobants.vue';
import UsersChart from '@/components/dashboard/RucChart.vue';
import WelcomeCard from '@/components/dashboard/WelcomeCard.vue';
import useDashboard from '@/composables/dashboard/useDashboard';
import { userStore } from '@/stores/useStore';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import { onBeforeMount, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const { isDashboardLoading, dashboardHasError, dashboardData } = useDashboard();
const authStore = userStore()

import {startTour} from '@/utils/tourManager'

const testTour = () => {
    startTour()
}
</script>

<template>
    <v-row>
        <v-col cols="12">

            <v-row>
                <v-col id="welcome-card" cols="12" md="6">
                    <WelcomeCard />
                </v-col>
                <v-col id="subscription-card" cols="12" md="3">
                    <SubscriptionCard :has-error="dashboardHasError" :is-loading="isDashboardLoading"
                        :transaction="dashboardData?.tenant.transactions" />
                </v-col>
                <v-col id="users-chart" cols="12" md="3">
                    <UsersChart :has-error="dashboardHasError" :is-loading="isDashboardLoading"
                        :rucs="dashboardData?.rucs" />
                </v-col>
            </v-row>
        </v-col>
        <v-col id="revenue-comprobants" cols="12" md="9">
            <RevenueComprobants :has-error="dashboardHasError" :is-loading="isDashboardLoading"
                :invoices="dashboardData?.invoices ?? []" :nc="dashboardData?.creditNotes ?? []"
                :nd="dashboardData?.debitNotes ?? []" :reten="dashboardData?.retentions ?? []" />
        </v-col>
        <v-col id="profile-card" cols="12" md="3">
            <ProifileCard />
        </v-col>
    </v-row>
</template>


<style scoped></style>
