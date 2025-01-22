<script setup lang="ts">
import { computed, PropType, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { Invoices } from '@/models/Invoice';
import { VBtn, VDataTable, VProgressCircular } from 'vuetify/lib/components/index.mjs';
import { useVoucher } from '@/composables/invoice/useVoucher';
import useInvoicesMutations from '@/composables/invoice/useInvoicesMutations';
import { toast } from 'vue3-toastify';
import { AxiosError } from 'axios';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { useRoute } from 'vue-router';
import { CreditNotes } from '@/models/CreditNote';
import useCreditNoteMutations from '@/composables/creditNote/useCreditNoteMutations';
import { DebitNotes } from '@/models/DebitNote';
import useDebitNoteMutations from '@/composables/debitNote/useDebitNoteMutations';
import { Retentions } from '@/models/Retention';
import useRetentionMutations from '@/composables/retention/useRetentionMutations';
import { AnnulledVouchers } from '@/models/AnnulledVouchers';

interface props {
    isLoading: boolean;
    hasError: boolean;
    combinedDocuments: {
        invoices: Invoices[];
        creditNotes: CreditNotes[];
        debitNotes: DebitNotes[];
        retentions: Retentions[];
        annulled: AnnulledVouchers[];
    };
    search: string;
    ruc: string;
}

const props = defineProps<props>();

const headers = [
    { title: 'Tipo Doc. /Ruc', value: 'ruc_emisor', class: 'my-header-style' },
    { title: 'Razón Social', value: 'razon_social_emisor' },
    { title: 'N. de Autorización', value: 'clave_acceso' },
    { title: 'Descarga', value: 'actions' }
];

const headersNulled = [
    { title: 'Tipo Doc. /Ruc', value: 'type', class: 'my-header-style' },
    { title: 'Razón Social', value: 'name' },
    { title: 'N. de Autorización', value: 'accessKey' },
    { title: 'Descarga', value: 'actions' }
];

const { exportInvoices, downloadInvoicesByFilterMutation } = useVoucher();
const tab = ref('Factura');
const { downloadDocumentMutation } = useInvoicesMutations();
const { downloadCreditNoteDocumentMutation, downloadCreditNoteByFilterMutation } = useCreditNoteMutations();
const { downloadDebitNoteDocumentMutation, downloadDebitNoteByFilterMutation } = useDebitNoteMutations();
const { downloadRetentionDocumentMutation, downloadRetentionsByFilterMutation } = useRetentionMutations();
const showImportExcel = ref(false);
const showImportDocuments = ref(false);
const documentType = ref<'pdf' | 'xml'>('pdf');
const { mdAndUp } = useDisplay();
const isRangeZipLoading = computed(
    () =>
        downloadInvoicesByFilterMutation.isPending.value ||
        downloadCreditNoteByFilterMutation.isPending.value ||
        downloadRetentionsByFilterMutation.isPending.value ||
        downloadDebitNoteByFilterMutation.isPending.value
);

let now = new Date();
now.setFullYear(now.getFullYear() - 4);
const minDate = ref(now);
const route = useRoute();

const date = ref({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
});

const onDocumentsDownload = (type: 'xml' | 'pdf' | 'todo', invoice: number, name: string) => {
    downloadDocumentMutation.mutate({ id: invoice, type: type, name: name });
};
const onCreditNoteDownload = (type: 'xml' | 'pdf' | 'todo', invoice: number, name: string) => {
    downloadCreditNoteDocumentMutation.mutate({ id: invoice, type: type, name: name });
};
const onDebitNoteDownload = (type: 'xml' | 'pdf' | 'todo', invoice: number, name: string) => {
    downloadDebitNoteDocumentMutation.mutate({ id: invoice, type: type, name: name });
};
const onRetentionDownload = (type: 'xml' | 'pdf' | 'todo', invoice: number, name: string) => {
    downloadRetentionDocumentMutation.mutate({ id: invoice, type: type, name: name });
};
const onExportInvoices = () => {
    exportInvoices.mutate({ year: date.value.year, month: date.value.month + 1, ruc: props.ruc });
};
const onRangeDownload = () => {
    if (tab.value == 'Factura') {
        downloadInvoicesByFilterMutation.mutate({
            type: documentType.value,
            month: date.value.month + 1,
            year: date.value.year,
            ruc: route.params.ruc.toString()
        });
    }
    if (tab.value == 'NotaCredito') {
        downloadCreditNoteByFilterMutation.mutate({
            type: documentType.value,
            month: date.value.month + 1,
            year: date.value.year,
            ruc: route.params.ruc.toString()
        });
    }
    if (tab.value == 'Retenciones') {
        downloadRetentionsByFilterMutation.mutate({
            type: documentType.value,
            month: date.value.month + 1,
            year: date.value.year,
            ruc: route.params.ruc.toString()
        });
    }
    if (tab.value == 'NotaDebito') {
        downloadDebitNoteByFilterMutation.mutate({
            type: documentType.value,
            month: date.value.month + 1,
            year: date.value.year,
            ruc: route.params.ruc.toString()
        });
    }
};

watch(downloadInvoicesByFilterMutation.isError, () => {
    if (downloadInvoicesByFilterMutation.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = downloadInvoicesByFilterMutation.error.value as AxiosError<{
            message: string[];
        }>;
        console.log(error, error.response?.data);
        if (error.response?.data?.message) {
            errorMessage = JSON.stringify(error.response?.data?.message);
        }
        toast.error(errorMessage);
    }
});
watch(downloadInvoicesByFilterMutation.isSuccess, () => {
    if (downloadInvoicesByFilterMutation.isSuccess.value) {
        let response = downloadInvoicesByFilterMutation.data.value;
        if (response) {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'facturas.zip');
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
        date.value = {
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        };
        showImportDocuments.value = false;
    }
});

watch(downloadCreditNoteByFilterMutation.isError, () => {
    if (downloadCreditNoteByFilterMutation.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = downloadCreditNoteByFilterMutation.error.value as AxiosError<{
            message: string;
        }>;
        if (error.response?.data?.message) {
            errorMessage = JSON.stringify(error.response?.data?.message);
        }
        toast.error(errorMessage);
    }
});
watch(downloadCreditNoteByFilterMutation.isSuccess, () => {
    if (downloadCreditNoteByFilterMutation.isSuccess.value) {
        let response = downloadCreditNoteByFilterMutation.data.value;
        if (response) {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'notas de credito.zip');
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
        date.value = {
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        };
        showImportDocuments.value = false;
    }
});

watch(downloadRetentionsByFilterMutation.isError, () => {
    if (downloadRetentionsByFilterMutation.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = downloadRetentionsByFilterMutation.error.value as AxiosError<{
            message: string;
        }>;
        if (error.response?.data?.message) {
            errorMessage = JSON.stringify(error.response?.data?.message);
        }
        toast.error(errorMessage);
    }
});
watch(downloadRetentionsByFilterMutation.isSuccess, () => {
    if (downloadRetentionsByFilterMutation.isSuccess.value) {
        let response = downloadRetentionsByFilterMutation.data.value;
        if (response) {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'retenciones.zip');
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
        date.value = {
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        };
        showImportDocuments.value = false;
    }
});

watch(downloadDebitNoteByFilterMutation.isError, () => {
    if (downloadDebitNoteByFilterMutation.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = downloadDebitNoteByFilterMutation.error.value as AxiosError<{
            message: string;
        }>;
        if (error.response?.data?.message) {
            errorMessage = JSON.stringify(error.response?.data?.message);
        }
        toast.error(errorMessage);
    }
});
watch(downloadDebitNoteByFilterMutation.isSuccess, () => {
    if (downloadDebitNoteByFilterMutation.isSuccess.value) {
        let response = downloadDebitNoteByFilterMutation.data.value;
        if (response) {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'notas de debito.zip');
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
        date.value = {
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        };
        showImportDocuments.value = false;
    }
});

watch(downloadDocumentMutation.isError, () => {
    if (downloadDocumentMutation.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = downloadDocumentMutation.error.value as AxiosError<{
            message: string;
        }>;
        if (error.response?.data?.message) {
            errorMessage = JSON.stringify(error.response?.data?.message);
        }
        toast.error(errorMessage);
    }
});
watch(downloadDocumentMutation.isSuccess, () => {
    if (downloadDocumentMutation.isSuccess.value) {
        let data = downloadDocumentMutation.data.value;
        if (data) {
            let type = downloadDocumentMutation.variables.value?.type;
            let name = downloadDocumentMutation.variables.value?.name;
            let a = document.createElement('a');
            document.body.appendChild(a);
            let url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = `${name}.${type}`;
            a.click();
            window.URL.revokeObjectURL(url);
        }
        date.value = {
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        };
        showImportDocuments.value = false;
    }
});
watch(downloadCreditNoteDocumentMutation.isError, () => {
    if (downloadCreditNoteDocumentMutation.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = downloadCreditNoteDocumentMutation.error.value as AxiosError<{
            message: string;
        }>;
        if (error.response?.data?.message) {
            errorMessage = JSON.stringify(error.response?.data?.message);
        }
        toast.error(errorMessage);
    }
});
watch(downloadCreditNoteDocumentMutation.isSuccess, () => {
    if (downloadCreditNoteDocumentMutation.isSuccess.value) {
        let data = downloadCreditNoteDocumentMutation.data.value;
        if (data) {
            let type = downloadCreditNoteDocumentMutation.variables.value?.type;
            let name = downloadCreditNoteDocumentMutation.variables.value?.name;
            let a = document.createElement('a');
            document.body.appendChild(a);
            let url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = `${name}.${type}`;
            a.click();
            window.URL.revokeObjectURL(url);
        }
        date.value = {
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        };
        showImportDocuments.value = false;
    }
});
watch(downloadDebitNoteDocumentMutation.isError, () => {
    if (downloadDebitNoteDocumentMutation.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = downloadDebitNoteDocumentMutation.error.value as AxiosError<{
            message: string;
        }>;
        if (error.response?.data?.message) {
            errorMessage = JSON.stringify(error.response?.data?.message);
        }
        toast.error(errorMessage);
    }
});
watch(downloadDebitNoteDocumentMutation.isSuccess, () => {
    if (downloadDebitNoteDocumentMutation.isSuccess.value) {
        let data = downloadDebitNoteDocumentMutation.data.value;
        if (data) {
            let type = downloadDebitNoteDocumentMutation.variables.value?.type;
            let name = downloadDebitNoteDocumentMutation.variables.value?.name;
            let a = document.createElement('a');
            document.body.appendChild(a);
            let url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = `${name}.${type}`;
            a.click();
            window.URL.revokeObjectURL(url);
        }
        date.value = {
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        };
        showImportDocuments.value = false;
    }
});

watch(downloadRetentionDocumentMutation.isError, () => {
    if (downloadRetentionDocumentMutation.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = downloadRetentionDocumentMutation.error.value as AxiosError<{
            message: string;
        }>;
        if (error.response?.data?.message) {
            errorMessage = JSON.stringify(error.response?.data?.message);
        }
        toast.error(errorMessage);
    }
});
watch(downloadRetentionDocumentMutation.isSuccess, () => {
    if (downloadRetentionDocumentMutation.isSuccess.value) {
        let data = downloadRetentionDocumentMutation.data.value;
        if (data) {
            let type = downloadRetentionDocumentMutation.variables.value?.type;
            let name = downloadRetentionDocumentMutation.variables.value?.name;
            let a = document.createElement('a');
            document.body.appendChild(a);
            let url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = `${name}.${type}`;
            a.click();
            window.URL.revokeObjectURL(url);
        }
        date.value = {
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        };
        showImportDocuments.value = false;
    }
});

watch(exportInvoices.isError, () => {
    if (exportInvoices.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = exportInvoices.error.value as AxiosError<{
            message: string;
        }>;
        if (error.response?.data?.message) {
            errorMessage = JSON.stringify(error.response?.data?.message);
        }
        toast.error(errorMessage);
    }
});
watch(exportInvoices.isSuccess, () => {
    if (exportInvoices.isSuccess.value) {
        let data = exportInvoices.data.value;
        if (data) {
            let a = document.createElement('a');
            document.body.appendChild(a);
            let url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = `consolidado.xlsx`;
            a.click();
            window.URL.revokeObjectURL(url);
        }
        date.value = {
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        };
        showImportExcel.value = false;
    }
});
</script>
<template>
    <!-- {{ combinedDocuments.invoices[0] }} -->
    <v-card elevation="10" class="revenue-products">
        <v-card-item class="pb-4">
            <div class="gap-3 d-flex align-center justify-space-between">
                <v-card-title>
                    <h1 class="text-h5">Comprobantes</h1>
                </v-card-title>
            </div>
            <div class="tw-flex tw-w-full tw-justify-between tw-flex-wrap tw-items-center tw-gap-3">
                <v-tabs v-model="tab" bg-color="transparent" height="40" class="mt-3" density="compact">
                    <v-tab density="compact" value="Factura" class="rounded-md font-weight-semibold">
                        <Icon icon="solar:widget-linear" height="16" class="me-2" />Factura
                    </v-tab>
                    <v-tab density="compact" value="NotaDebito" class="rounded-md font-weight-semibold">
                        <Icon icon="solar:smartphone-line-duotone" height="16" class="me-2" />N. de Débito
                    </v-tab>
                    <v-tab density="compact" value="NotaCredito" class="rounded-md font-weight-semibold">
                        <Icon icon="solar:calculator-linear" height="16" class="me-2" />N. de Crédito
                    </v-tab>
                    <v-tab density="compact" value="Retenciones" class="rounded-md font-weight-semibold">
                        <Icon icon="solar:folder-open-outline" height="16" class="me-2" />Retenciones
                    </v-tab>
                    <v-tab density="compact" value="Anulados" class="rounded-md font-weight-semibold">
                        <Icon icon="ic:baseline-space-dashboard" height="16" class="me-2" />Anulados
                    </v-tab>
                </v-tabs>
                <div class="">
                    <VBtn
                        class="me-2 tw-mt-4"
                        prepend-icon="mdi-file-excel-box"
                        color="success"
                        @click="showImportExcel = true"
                        :loading="exportInvoices.isPending.value"
                        >Descargar Excel</VBtn
                    >
                    <VBtn
                        class="me-2 tw-mt-4"
                        prepend-icon="mdi-file-document"
                        color="warning"
                        @click="showImportDocuments = true"
                        :loading="isRangeZipLoading"
                    >
                        Descargar documentos</VBtn
                    >
                </div>
            </div>
            <div class="mt-4 tw-w-full tw-flex tw-justify-center tw-items-center tw-h-36" v-if="isLoading">
                <VProgressCircular indeterminate />
            </div>
            <div class="mt-4 tw-w-full tw-flex tw-justify-center tw-items-center tw-h-36" v-else-if="hasError">
                <p class="tw-font-semibold">Error en el servidor 🥲</p>
            </div>
            <div class="mt-4">
                <v-window v-model="tab">
                    <v-window-item value="Factura">
                        <VDataTable
                            class="text-textSecondary"
                            :items="combinedDocuments.invoices"
                            :headers="headers"
                            :search="props.search"
                            :no-data-text="'No tiene facturas'"
                        >
                            <template v-slot:item.ruc_emisor="{ item }">
                                <div class="d-flex align-center">
                                    <div class="mx-3">
                                        <h6 class="mb-1 tw-text-ellipsis text-no-wrap tw-text-base">
                                            {{ item.ruc_emisor }}
                                        </h6>
                                    </div>
                                </div>
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <div class="tw-flex tw-gap-3" v-if="downloadDocumentMutation.isPending.value">
                                    <VProgressCircular indeterminate />
                                </div>
                                <div class="tw-flex tw-gap-3" v-else>
                                    <a
                                        class="tw-text-orange-500 tw-cursor-pointer"
                                        @click="onDocumentsDownload('pdf', item.id, item.clave_acceso)"
                                    >
                                        <Icon icon="fa6-regular:file-pdf" height="24" />
                                    </a>
                                    <a
                                        class="tw-text-red-500 tw-cursor-pointer"
                                        @click="onDocumentsDownload('xml', item.id, item.clave_acceso)"
                                    >
                                        <Icon icon="tabler:file-type-xml" height="24" />
                                    </a>
                                </div>
                            </template>
                        </VDataTable>
                    </v-window-item>
                    <v-window-item value="NotaDebito">
                        <VDataTable
                            class="text-textSecondary"
                            :items="combinedDocuments.debitNotes"
                            :headers="headers"
                            :search="props.search"
                            :no-data-text="'No tiene Notas de Débito'"
                        >
                            <template v-slot:item.fecha_autorizacion="{ item }">
                                <div class="d-flex align-center">
                                    <div class="mx-3">
                                        <h6 class="mb-1 tw-text-ellipsis text-no-wrap tw-text-base">
                                            {{ item.ruc_emisor }}
                                        </h6>
                                    </div>
                                </div>
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <div class="tw-flex tw-gap-3" v-if="downloadDebitNoteDocumentMutation.isPending.value">
                                    <VProgressCircular indeterminate />
                                </div>
                                <div class="tw-flex tw-gap-3" v-else>
                                    <a
                                        class="tw-text-orange-500 tw-cursor-pointer"
                                        @click="onDebitNoteDownload('pdf', item.id, item.clave_acceso)"
                                    >
                                        <Icon icon="fa6-regular:file-pdf" height="24" />
                                    </a>
                                    <a
                                        class="tw-text-red-500 tw-cursor-pointer"
                                        @click="onDebitNoteDownload('xml', item.id, item.clave_acceso)"
                                    >
                                        <Icon icon="tabler:file-type-xml" height="24" />
                                    </a>
                                </div>
                            </template>
                        </VDataTable>
                    </v-window-item>
                    <v-window-item value="NotaCredito">
                        <VDataTable
                            class="text-textSecondary"
                            :items="combinedDocuments.creditNotes"
                            :headers="headers"
                            :search="props.search"
                            :no-data-text="'No tiene Notas de Crédito'"
                        >
                            <template v-slot:item.fecha_autorizacion="{ item }">
                                <div class="d-flex align-center">
                                    <div class="mx-3">
                                        <h6 class="mb-1 tw-text-ellipsis text-no-wrap tw-text-base">
                                            {{ item.ruc_emisor }}
                                        </h6>
                                        <span class="tw-text-current tw-text-nowrap lightsecondary tw-text-base">{{
                                            item.ruc_emisor
                                        }}</span>
                                    </div>
                                </div>
                                <div>hoolaaa</div>
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <div class="tw-flex tw-gap-3" v-if="downloadCreditNoteDocumentMutation.isPending.value">
                                    <VProgressCircular indeterminate />
                                </div>
                                <div class="tw-flex tw-gap-3" v-else>
                                    <a
                                        class="tw-text-orange-500 tw-cursor-pointer"
                                        @click="onCreditNoteDownload('pdf', item.id, item.clave_acceso)"
                                    >
                                        <Icon icon="fa6-regular:file-pdf" height="24" />
                                    </a>
                                    <a
                                        class="tw-text-red-500 tw-cursor-pointer"
                                        @click="onCreditNoteDownload('xml', item.id, item.clave_acceso)"
                                    >
                                        <Icon icon="tabler:file-type-xml" height="24" />
                                    </a>
                                </div>
                            </template>
                        </VDataTable>
                    </v-window-item>
                    <v-window-item value="Retenciones">
                        <VDataTable
                            class="text-textSecondary"
                            :items="combinedDocuments.retentions"
                            :headers="headers"
                            :search="props.search"
                            :no-data-text="'No tiene Retenciones'"
                        >
                            <template v-slot:item.fecha_autorizacion="{ item }">
                                <div class="d-flex align-center">
                                    <div class="mx-3">
                                        <h6 class="mb-1 tw-text-ellipsis text-no-wrap tw-text-base">
                                            {{ item.ruc_emisor }}
                                        </h6>
                                        <span class="tw-text-current tw-text-nowrap lightsecondary tw-text-base">{{
                                            item.ruc_emisor
                                        }}</span>
                                    </div>
                                </div>
                                <div>hoolaaa</div>
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <div class="tw-flex tw-gap-3" v-if="downloadRetentionDocumentMutation.isPending.value">
                                    <VProgressCircular indeterminate />
                                </div>
                                <div class="tw-flex tw-gap-3" v-else>
                                    <a
                                        class="tw-text-orange-500 tw-cursor-pointer"
                                        @click="onRetentionDownload('pdf', item.id, item.clave_acceso)"
                                    >
                                        <Icon icon="fa6-regular:file-pdf" height="24" />
                                    </a>
                                    <a
                                        class="tw-text-red-500 tw-cursor-pointer"
                                        @click="onRetentionDownload('xml', item.id, item.clave_acceso)"
                                    >
                                        <Icon icon="tabler:file-type-xml" height="24" />
                                    </a>
                                </div>
                            </template>
                        </VDataTable>
                    </v-window-item>
                    <v-window-item value="Anulados">
                        <VDataTable
                            class="text-textSecondary"
                            :items="combinedDocuments.annulled"
                            :headers="headersNulled"
                            :search="props.search"
                            :no-data-text="'No tiene Retenciones'"
                        >
                            <template v-slot:item.actions="{ item }"> </template>
                        </VDataTable>
                    </v-window-item>
                </v-window>
            </div>
        </v-card-item>
    </v-card>
    <v-dialog max-width="700" v-model="showImportExcel">
        <form action="" @submit.prevent="onExportInvoices">
            <VCard>
                <VCardTitle class="bg-primary">
                    <h1>Descargar Excel</h1>
                </VCardTitle>
                <VCardText>
                    <VRow>
                        <VCol cols="0" md="6" v-if="mdAndUp">
                            <img src="/src/assets/images/products/EXCELDAY.png" />
                        </VCol>
                        <VCol cols="0" md="6">
                            <VRow>
                                <VCol cols="12">
                                    <p class="tw-text-sm tw-text-gray-400">Vamos a descargar todos los documentos</p>
                                </VCol>
                                <VCol cols="12">
                                    <div class="tw-flex tw-flex-col tw-gap-1">
                                        <label for="">Fecha</label>
                                        <VueDatePicker
                                            v-model="date"
                                            month-picker
                                            teleport-center
                                            :max-date="new Date()"
                                            :min-date="minDate"
                                            :clearable="false"
                                        />
                                    </div>
                                </VCol>
                            </VRow>
                        </VCol>
                    </VRow>
                </VCardText>
                <VCardActions>
                    <div class="tw-flex tw-w-full tw-justify-end tw-gap-2">
                        <VBtn
                            flat
                            color="borderColor"
                            variant="elevated"
                            @click="showImportExcel = false"
                            :loading="exportInvoices.isPending.value"
                        >
                            cancelar
                        </VBtn>
                        <VBtn color="primary" variant="elevated" type="submit" :loading="exportInvoices.isPending.value"> Descargar </VBtn>
                    </div>
                </VCardActions>
            </VCard>
        </form>
    </v-dialog>
    <v-dialog max-width="700" v-model="showImportDocuments">
        <form action="" @submit.prevent="onRangeDownload">
            <VCard>
                <VCardTitle class="bg-primary">
                    <h1>Descargar documentos</h1>
                </VCardTitle>
                <VCardText>
                    <VRow>
                        <VCol cols="0" md="6" v-if="mdAndUp">
                            <img src="/src/assets/images/products/descargar-zip.png" />
                        </VCol>
                        <VCol cols="0" md="6">
                            <VRow>
                                <VCol cols="12">
                                    <p class="tw-text-sm tw-text-gray-400">Vamos a descargar todos los documentos</p>
                                </VCol>
                                <VCol cols="12">
                                    <div class="tw-flex tw-flex-col tw-gap-1">
                                        <label for="">Fecha</label>
                                        <VueDatePicker
                                            v-model="date"
                                            month-picker
                                            teleport-center
                                            :max-date="new Date()"
                                            :min-date="minDate"
                                            :clearable="false"
                                        />
                                    </div>
                                </VCol>
                                <VCol cols="12">
                                    <div class="tw-flex tw-flex-col tw-gap-1">
                                        <label for="">Tipo documento</label>
                                        <v-btn-toggle v-model="documentType" color="primary" mandatory>
                                            <v-btn value="pdf">PDF</v-btn>
                                            <v-btn value="xml">XML</v-btn>
                                            <v-btn value="todo">TODOS</v-btn>
                                        </v-btn-toggle>
                                    </div>
                                </VCol>
                            </VRow>
                        </VCol>
                    </VRow>
                </VCardText>
                <VCardActions>
                    <div class="tw-flex tw-w-full tw-justify-end tw-gap-2">
                        <VBtn flat color="borderColor" variant="elevated" @click="showImportDocuments = false" :loading="isRangeZipLoading">
                            cancelar
                        </VBtn>
                        <VBtn color="primary" variant="elevated" type="submit" :loading="isRangeZipLoading"> Descargar </VBtn>
                    </div>
                </VCardActions>
            </VCard>
        </form>
    </v-dialog>
</template>
