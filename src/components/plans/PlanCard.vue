<script setup lang="ts">
import { Plans } from '@/models/Plans';
import { Icon } from '@iconify/vue';
import { VBtn, VCard, VCardActions, VCardItem, VCardTitle, VImg } from 'vuetify/lib/components/index.mjs';
import image from '@/assets/images/products/plan_defaut.png';
interface props {
    plan: Plans;
    isButtonLoading: boolean;
}

const props = defineProps<props>();
const emit = defineEmits(['plan-selected']);
</script>

<template>
    <VCard variant="flat" width="280">
        <VCardTitle class="pt-4">
            <h1 class="text-primary">{{ props.plan.name }}</h1>
        </VCardTitle>
        <VCardItem>
            <div class="tw-mb-6">
                <VImg :src="props.plan.img ?? image" width="100" height="100" />
            </div>
            <div class="tw-mb-6 text-primary tw-font-semibold">${{ parseFloat(props.plan.price).toFixed(2) }}
            </div>
            <div class="tw-flex tw-flex-col tw-gap-4">
                <div class="tw-flex tw-gap-3 tw-items-center">
                    <Icon icon="material-symbols:check-rounded" class="text-primary" :height="20" />
                    <p class="text-primary">{{ props.plan.vouchers }} Documentos</p>
                </div>
                <div class="tw-flex tw-gap-3 tw-items-center">
                    <Icon icon="material-symbols:check-rounded" class="text-primary" :height="20" />
                    <p class="text-primary">{{ props.plan.rucs }} Ruc</p>
                </div>
                <div class="tw-flex tw-gap-3 tw-items-center">
                    <Icon icon="material-symbols:check-rounded" class="text-primary" :height="20" />
                    <p class="text-primary">{{ props.plan.usersOnline }} Usuario</p>
                </div>
            </div>
        </VCardItem>
        <VCardActions>
            <VBtn color="primary" :loading="isButtonLoading" variant="elevated" block @click="emit('plan-selected', props.plan)"
                >Escoger {{ props.plan.name }}</VBtn
            >
        </VCardActions>
    </VCard>
</template>

<style scoped></style>
