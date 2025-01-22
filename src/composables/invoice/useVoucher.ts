import { api } from '@/api/axios';
import { ref, watch } from 'vue';
import { useMutation, useQuery } from '@tanstack/vue-query';

const isDownloading = ref(false);

const fetchInvoices = async (req: { month: number; year: number; ruc: string }): Promise<Blob> => {
    const { data } = await api.post('/invoice/export-invoices', req, {
        responseType: 'blob'
    });
    return data;
};

const downloadInvoicesByFilter = async (req: { type: 'xml' | 'pdf'; month: number; year: number; ruc: string }): Promise<Blob> => {
    const { data } = await api.put(`/invoice/download-invoices/${req.ruc}`, req, {
        responseType: 'blob'
    });
    return data;
};

export const useVoucher = () => {
    // watch(data, (newData) => {
    //     if (newData) {
    //         const url = window.URL.createObjectURL(new Blob([newData]));
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', 'invoices.xlsx');
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //     }
    // });
    const downloadInvoicesByFilterMutation = useMutation({ mutationFn: downloadInvoicesByFilter });
    const exportInvoices = useMutation({ mutationFn: fetchInvoices });

    return {
        exportInvoices,
        downloadInvoicesByFilterMutation
    };
};
