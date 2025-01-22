<script setup lang="ts">
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { Invoices } from '@/models/Invoice';
import { VDataTable, VProgressCircular } from 'vuetify/lib/components/index.mjs';
import useInvoicesMutations from '@/composables/invoice/useInvoicesMutations';
import { AxiosError } from 'axios';
import { toast } from 'vue3-toastify';
import useCreditNoteMutations from '@/composables/creditNote/useCreditNoteMutations';
import useDebitNoteMutations from '@/composables/debitNote/useDebitNoteMutations';
import useRetentionMutations from '@/composables/retention/useRetentionMutations';

interface props {
    isLoading: boolean;
    hasError: boolean;
    invoices: Invoices[];
    nc: Invoices[];
    nd: Invoices[];
    reten: Invoices[];
}
const props = defineProps<props>();

const headers = [
    { title: 'Tipo Doc. /Ruc', value: 'fecha_autorizacion', class: 'my-header-style' },
    { title: 'Razón Social', value: 'razon_social_emisor' },
    { title: 'N. de Autorización', value: 'clave_acceso' },
    { title: 'Descarga', value: 'actions' }
];

/*tab*/
const tab = ref('Factura');
const { downloadDocumentMutation } = useInvoicesMutations();
const { downloadCreditNoteDocumentMutation } = useCreditNoteMutations();
const { downloadDebitNoteDocumentMutation } = useDebitNoteMutations();
const { downloadRetentionDocumentMutation } = useRetentionMutations();

const onDocumentsDownload = (type: 'xml' | 'pdf' | 'todo', invoice: number, name: string) => {
    downloadDocumentMutation.mutate({ id: invoice, type: type, name });
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
            let url = window.URL.createObjectURL(data as Blob);
            a.href = url;
            a.download = `${name}.${type}`;
            a.click();
            window.URL.revokeObjectURL(url);
        }
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
    }
});
</script>
<template>
    <v-card elevation="10" class="revenue-products">
        <v-card-item class="pb-4">
            <div class="gap-3 d-flex align-center justify-space-between">
                <v-card-title>
                    <h1 class="text-h5">Últimos comprobantes</h1>
                </v-card-title>
                <div>
                    <!-- <VSelect v-model="invoices" :items="items" variant="outlined" density="compact" hide-details>
                    </VSelect> -->
                </div>
            </div>
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
            </v-tabs>
            <div class="mt-4 tw-w-full tw-flex tw-justify-center tw-items-center tw-h-36" v-if="isLoading">
                <VProgressCircular indeterminate />
            </div>
            <div class="mt-4 tw-w-full tw-flex tw-justify-center tw-items-center tw-h-36" v-else-if="hasError">
                <p class="tw-font-semibold">Error en el servidor 🥲</p>
            </div>
            <div class="mt-4" v-else>
                <v-window v-model="tab">
                    <!-- App Tab -->
                    <v-window-item value="Factura">
                        <VDataTable class="text-textSecondary" :items="invoices" :headers="headers" :no-data-text="'No tiene facturas'">
                            <template v-slot:item.fecha_autorizacion="{ item }">
                                <div class="d-flex align-center">
                                    <div class="mx-3">
                                        <h6 class="mb-1 tw-text-ellipsis text-no-wrap tw-text-base">Factura</h6>
                                        <span class="tw-text-current tw-text-nowrap lightsecondary tw-text-base">{{
                                            item.ruc_emisor
                                        }}</span>
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
                            <template #bottom></template>
                        </VDataTable>
                    </v-window-item>
                    <v-window-item value="NotaDebito">
                        <VDataTable class="text-textSecondary" :items="nd" :headers="headers" :no-data-text="'No tiene Notas de Débito'">
                            <template v-slot:item.fecha_autorizacion="{ item }">
                                <div class="d-flex align-center">
                                    <div class="mx-3">
                                        <h6 class="mb-1 tw-text-ellipsis text-no-wrap tw-text-base">Nota de debito</h6>
                                        <span class="tw-text-current tw-text-nowrap lightsecondary tw-text-base">{{
                                            item.ruc_emisor
                                        }}</span>
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
                            <template #bottom></template>
                        </VDataTable>
                    </v-window-item>
                    <v-window-item value="NotaCredito">
                        <VDataTable class="text-textSecondary" :items="nc" :headers="headers" :no-data-text="'No tiene Notas de Crédito'">
                            <template v-slot:item.fecha_autorizacion="{ item }">
                                <div class="d-flex align-center">
                                    <div class="mx-3">
                                        <h6 class="mb-1 tw-text-ellipsis text-no-wrap tw-text-base">Nota de credito</h6>
                                        <span class="tw-text-current tw-text-nowrap lightsecondary tw-text-base">{{
                                            item.ruc_emisor
                                        }}</span>
                                    </div>
                                </div>
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
                            <template #bottom></template>
                        </VDataTable>
                    </v-window-item>
                    <v-window-item value="Retenciones">
                        <VDataTable class="text-textSecondary" :items="reten" :headers="headers" :no-data-text="'No tiene Retenciones'">
                            <template v-slot:item.fecha_autorizacion="{ item }">
                                <div class="d-flex align-center">
                                    <div class="mx-3">
                                        <h6 class="mb-1 tw-text-ellipsis text-no-wrap tw-text-base">Retenciones</h6>
                                        <span class="tw-text-current tw-text-nowrap lightsecondary tw-text-base">{{
                                            item.ruc_emisor
                                        }}</span>
                                    </div>
                                </div>
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
                            <template #bottom></template>
                        </VDataTable>
                    </v-window-item>
                </v-window>
            </div>
        </v-card-item>
    </v-card>
</template>
