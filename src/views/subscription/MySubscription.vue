<script setup lang="ts">
import PayphoneCheckout from '@/components/checkout/PayphoneCheckout.vue';
import PlanCard from '@/components/plans/PlanCard.vue';
import useCheckPayment from '@/composables/checkout/useCheckPayment';
import usePlans from '@/composables/plans/usePlans';
import { Plans } from '@/models/Plans';
import { checkoutStore } from '@/stores/checkout';
import { AxiosError } from 'axios';
import { ref, watch } from 'vue';
import { toast } from 'vue3-toastify';
import { VDialog } from 'vuetify/lib/components/index.mjs';

const { isError, isFetching, plans } = usePlans();
const { getPaymentDataMutation } = useCheckPayment();
const showDialog = ref(false);
const storeCheckout = checkoutStore();

const onPlanSelecte = (planSelected: Plans) => {
    getPaymentDataMutation.mutate(planSelected);
};

watch(getPaymentDataMutation.isError, () => {
    if (getPaymentDataMutation.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = getPaymentDataMutation.error.value as AxiosError<{
            message: string;
        }>;
        if (error.response?.data?.message) {
            errorMessage = JSON.stringify(error.response?.data?.message);
        }
        toast.error(errorMessage);
    }
});
watch(getPaymentDataMutation.isSuccess, () => {
    if (getPaymentDataMutation.isSuccess.value) {
        let response = getPaymentDataMutation.data.value;
        if (response) {
            storeCheckout.setToken(response.token);
            storeCheckout.setProductId(getPaymentDataMutation.variables.value?.id!);
            storeCheckout.setRedirectRouterName('home');
            console.log(storeCheckout.token);
            showDialog.value = true;
        }
    }
});
</script>

<template>
    <div class="">
        <div class="tw-h-32 tw-grid tw-place-content-center" v-if="isFetching">
            <VProgressCircular indeterminate />
        </div>
        <div class="tw-h-32 tw-grid tw-place-content-center" v-else-if="isError">
            <p>Error consultando los planes</p>
        </div>
        <div class="tw-flex tw-flex-wrap tw-gap-8" v-else>
            <PlanCard
                v-for="item in plans"
                :plan="item"
                @plan-selected="onPlanSelecte"
                :is-button-loading="getPaymentDataMutation.isPending.value"
            />
        </div>
        <VDialog v-model="showDialog">
            <PayphoneCheckout :data="getPaymentDataMutation.data.value" />
        </VDialog>
    </div>
</template>
