import { api } from '@/api/axios';
import { Retentions } from '@/models/Retention';
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';

const retentions = ref<Retentions[]>([]);

const fetchRetentions = async (ruc: string): Promise<Retentions[]> => {
    const { data } = await api.get<Retentions[]>(`/retention/index/${ruc}`);
    return data;
};

const useRetentions = (ruc: string) => {
    const { data, isError, isFetching } = useQuery({
        queryKey: ['retentions'],
        queryFn: () => fetchRetentions(ruc)
    });

    watch(data, () => {
        if (data.value) {
            retentions.value = [...data.value];
        }
    });

    return {
        retentionsHasError: isError,
        isRetentionsLoading: isFetching,
        retentions,
    };
};

export default useRetentions;
