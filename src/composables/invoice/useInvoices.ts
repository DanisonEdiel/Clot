import { api } from '@/api/axios';
import type { Invoices } from '@/models/Invoice';
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';

const invoices = ref<Invoices[]>([]);
const creditNotes = ref<Invoices[]>([]);
// const retentions = ref<Invoices[]>([]);
// const debitNotes = ref<Invoices[]>([]);
const allInvoices = ref<Invoices[]>([]);

const fetchInvoices = async (ruc: string): Promise<Invoices[]> => {
    const { data } = await api.get<Invoices[]>(`/invoice/index/${ruc}`);
    return data;
};

const useInvoices = (ruc: string) => {
    const { data, isError, isFetching } = useQuery({
        queryKey: ['invoices'],
        queryFn: () => fetchInvoices(ruc)
    });

    watch(data, () => {
        if (data.value) {
            invoices.value = [...data.value];
            // creditNotes.value = [...data.value.creditNotes];
            // retentions.value = [...data.value.retentions];
            // debitNotes.value = [...data.value.debitNotes];
            // allInvoices.value = [...invoices.value, ...creditNotes.value];
        }
    });

    return {
        invoicesHasError: isError,
        isInvoicesLoading: isFetching,
        invoices,
        // creditNotes,
        // retentions,
        // debitNotes,
        // allInvoices
    };
};

export default useInvoices;
