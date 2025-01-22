<script setup lang="ts">
import { computed } from 'vue';
import { getSecondary } from '@/utils/UpdateColors';
import { Icon } from '@iconify/vue';
import useRucs from '@/composables/ruc/useRucs';
import { useRouter } from 'vue-router';
/* Chart */
const areachartOptions = computed(() => {
    return {
        chart: {
            type: 'area',
            height: 90,
            sparkline: {
                enabled: true
            },
            group: 'sparklines',
            fontFamily: 'inherit',
            foreColor: '#adb0bb'
        },
        colors: [getSecondary.value],
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            type: 'gradient',
            color: [getSecondary.value],
            gradient: {
                shadeIntensity: 0,
                inverseColors: false,
                opacityFrom: 0.2,
                opacityTo: 1,
                stops: [100]
            }
        },
        markers: {
            size: 0
        },
        tooltip: {
            theme: 'dark',
            fixed: {
                enabled: true,
                position: 'right'
            },
            x: {
                show: false
            },
            enabled: false,
        }
    };
});

const areaChart = {
    series: [
        {
            name: 'customers',
            data: [36, 45, 31, 47, 38, 43]
        }
    ]
};

interface props {
    isLoading: boolean;
    hasError: boolean;
    rucs: number | undefined;
}
const props = defineProps<props>();
const router = useRouter();
</script>
<template>
    <v-card elevation="0" class="pb-0 overflow-hidden bg-lightsecondary tw-h-full d-flex justify-space-between tw-flex-col">
        <v-card-item>
            <div class="d-flex align-center justify-space-between">
                <div>
                    <p class="mb-1 font-weight-semibold text-lightsuccess">Ruc Creados</p>
                    <div class="gap-3 d-flex align-center">
                        <h3 class="text-24 heading" v-if="props.isLoading">
                            <VProgressCircular indeterminate color="primary" />
                        </h3>
                        <h3 class="text-24 heading" v-else-if="props.hasError">🥲</h3>
                        <h3 class="tw-text-center text-24 heading text-lightsuccess">{{ props.rucs }}</h3>
                    </div>
                </div>
                <v-avatar size="48" class="rounded-md bg-surface tw-cursor-pointer" @click="router.push({ name: 'ruc-list' })">
                    <Icon icon="material-symbols:add-2" class="text-secondary" height="27" />
                </v-avatar>
            </div>
        </v-card-item>
        <apexchart type="area" height="90" class="mt-4" :options="areachartOptions" :series="areaChart.series"> </apexchart>
    </v-card>
</template>
