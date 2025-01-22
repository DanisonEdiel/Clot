<script setup lang="ts">
import TableAdminStats from '@/components/dashboard/TableAdminStats.vue';
import WelcomeCardAdmin from '@/components/dashboard/WelcomeCardAdmin.vue';
import useAdminDashboard from '@/composables/dashboard/useAdminDashboard';
import { userStore } from '@/stores/useStore';
import 'shepherd.js/dist/css/shepherd.css';
const authStore = userStore()
</script>


<template>
    <v-row>
        <v-col id="welcome-card" cols="12">
            <WelcomeCardAdmin />
        </v-col>
        <v-col id="revenue-comprobants" cols="12">
            <TableAdminStats />
        </v-col>
    </v-row>
</template>
