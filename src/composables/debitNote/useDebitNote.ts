import { api } from '@/api/axios';
import { DebitNotes } from '@/models/DebitNote';
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';

const debitNotes = ref<DebitNotes[]>([]);

const fetchDebitNotes = async (ruc: string): Promise<DebitNotes[]> => {
    const { data } = await api.get<DebitNotes[]>(`/debit-note/index/${ruc}`);
    return data;
};

const useDebitNotes = (ruc: string) => {
    const { data, isError, isFetching } = useQuery({
        queryKey: ['debitNotes'],
        queryFn: () => fetchDebitNotes(ruc)
    });

    watch(data, () => {
        if (data.value) {
            debitNotes.value = [...data.value];
        }
    });

    return {
        debitNotesHasError: isError,
        isDebitNotesLoading: isFetching,
        debitNotes,
    };
};

export default useDebitNotes;
