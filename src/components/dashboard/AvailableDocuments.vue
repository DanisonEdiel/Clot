<script setup lang="ts">
import useDashboard from '@/composables/dashboard/useDashboard';
import { subscription, transactions } from '@/models/Dashboard';
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import { VProgressCircular } from 'vuetify/lib/components/index.mjs';

const barchartOptions = computed(() => {
    return {
        chart: {
            fontFamily: 'inherit',
            foreColor: '#F6B63E',
            type: 'bar',
            height: 98,
            stacked: true,
            offsetX: -5,
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: true
            }
        },
        colors: ['#ffffff', 'rgba(255,255,255,0.5)'],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '26%',
                borderRadius: [3],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all'
            }
        },
        dataLabels: {
            enabled: false
        },
        tooltip: {
            theme: 'dark',
            enabled: false
        },
        legend: {
            show: false
        }
    };
});

const barChart = {
    series: [
        {
            name: 'Site A',
            data: [29, 52, 38, 47, 56, 41, 46]
        },
        {
            name: 'Site B',
            data: [71, 71, 71, 71, 71, 71, 71]
        }
    ]
};

interface props {
    isLoading: boolean;
    hasError: boolean;
    transaction: transactions | undefined;
}
const props = defineProps<props>();
</script>
<template>
    <v-card elevation="10" class="overflow-hidden tw-h-full bg-lighterror">
        <v-card-item>
            <div class="d-flex align-center justify-space-between">
                <div>
                    <p class="mb-1 font-weight-semibold text-lightsuccess">Documentos Disponibles</p>
                    <div class="gap-3 d-flex align-center">
                        <VProgressCircular indeterminate v-if="props.isLoading" />
                        <h3 class="text-24 heading text-lightsuccess" v-else-if="props.hasError">🥲</h3>
                        <h3 class="text-24 heading text-lightsuccess" v-else>{{ props.transaction?.transactions }}</h3>
                    </div>
                </div>
                <v-avatar size="48" class="rounded-md bg-surface">
                    <Icon icon="solar:layers-linear" class="text-error" height="22" />
                </v-avatar>
            </div>

            <div class="mt-2">
                <apexchart type="bar" height="98" :options="barchartOptions" :series="barChart.series" class="rounded-bars"> </apexchart>
            </div>
        </v-card-item>
    </v-card>
</template>
