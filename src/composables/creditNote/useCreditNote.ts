import { api } from '@/api/axios';
import type { CreditNotes } from '@/models/CreditNote';
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';

const creditNotes = ref<CreditNotes[]>([]);

const fetchCreditNotes = async (ruc: string): Promise<CreditNotes[]> => {
    const { data } = await api.get<CreditNotes[]>(`/credit-note/index/${ruc}`);
    return data;
};

const useCreditNotes = (ruc: string) => {
    const { data, isError, isFetching } = useQuery({
        queryKey: ['creditNotes'],
        queryFn: () => fetchCreditNotes(ruc)
    });

    watch(data, () => {
        if (data.value) {
            creditNotes.value = [...data.value];
        }
    });

    return {
        creditNotesHasError: isError,
        isCreditNotesLoading: isFetching,
        creditNotes,
    };
};

export default useCreditNotes;
