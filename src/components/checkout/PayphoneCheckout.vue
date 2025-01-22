<script setup lang="ts">
import { PaymentDataApiResponse } from '@/models/ApiResponse';
import { onMounted } from 'vue';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';

interface props {
    data: PaymentDataApiResponse | undefined;
}

const props = defineProps<props>();

onMounted(() => {
    //@ts-ignore
    const ppb = new PPaymentButtonBox({
        token: props.data?.token,
        amount: props.data?.amount,
        amountWithoutTax: props.data?.amount,
        amountWithTax: 0,
        reference: 'Prueba Cajita de Pagos Payphone',
        clientTransactionId: props.data?.transactionId
    }).render('pp-button');
});
</script>

<template>
    <PerfectScrollbar class="tw-h-screen">
        <link rel="stylesheet" href="https://cdn.payphonetodoesposible.com/box/v1.1/payphone-payment-box.css" />

        <div id="pp-button"></div>
    </PerfectScrollbar>
</template>

<style scoped></style>
