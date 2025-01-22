<script setup lang="ts">
import ComprobantsTable from '@/components/dashboard/ComprobantsTable.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import useInvoices from '@/composables/invoice/useInvoices';
import useCreditNotes from '@/composables/creditNote/useCreditNote';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { VCard, VProgressCircular } from 'vuetify/lib/components/index.mjs';
import useDebitNotes from '@/composables/debitNote/useDebitNote';
import useRetentions from '@/composables/retention/useRetention';
import useAnnulledVouchers from '@/composables/annulledVoucher/useAnnulledVouchers';

const page = ref({ title: 'Lista de documentos' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '/home'
    },
    {
        text: 'Lista de Documentos',
        disabled: true,
        href: '#'
    }
]);

const search = ref();

const route = useRoute();
const ruc = route.params.ruc.toString();

const { invoices, invoicesHasError, isInvoicesLoading } = useInvoices(ruc);
const { creditNotes, creditNotesHasError, isCreditNotesLoading } = useCreditNotes(ruc);
const { debitNotes, isDebitNotesLoading } = useDebitNotes(ruc);
const { isRetentionsLoading, retentions } = useRetentions(ruc);
const { annulledVouchersIsError, isAnnulledVouchersLoading, annulledVouchers } = useAnnulledVouchers(ruc);
// const isLoading = ref(isInvoicesLoading || isCreditNotesLoading);
// const hasError = ref(invoicesHasError || creditNotesHasError);
const isLoading = computed(() => isInvoicesLoading || isCreditNotesLoading || isDebitNotesLoading || isRetentionsLoading);
const hasError = computed(() => invoicesHasError || creditNotesHasError);

const combinedDocuments = computed(() => {
    return {
        invoices: invoices.value,
        creditNotes: creditNotes.value,
        debitNotes: debitNotes.value,
        retentions: retentions.value,
        annulled: annulledVouchers.value
    };
});
</script>
<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12">
            <v-card elevation="10" flat>
                <v-text-field
                    v-model="search"
                    append-inner-icon="mdi-magnify"
                    placeholder="Buscar comprobante"
                    single-line
                    hide-details
                    class="mb-5 tw-p-6"
                />
            </v-card>
            <ComprobantsTable
                :is-loading="isLoading.value"
                :has-error="hasError.value"
                :combinedDocuments="combinedDocuments"
                :search="search"
                :ruc="ruc"
            />
        </v-col>
    </v-row>
</template>
