import { api } from '@/api/axios';
import type { Ruc } from '@/models/Ruc';
import { useQuery } from '@tanstack/vue-query';
import { watch } from 'vue';
import { ref } from 'vue';

const rucs = ref<Ruc[]>([]);
const idlRucs = ref<Ruc[]>([]);

const fetchRucs = async (): Promise<Ruc[]> => {
    const { data } = await api.get('/ruc/index');
    return data;
};

const useRucs = () => {
    const { data, isError, isFetching, refetch } = useQuery({
        queryKey: ['rucs'],
        queryFn: fetchRucs
    });

    watch(data, () => {
        if (data.value) {
            rucs.value = JSON.parse(JSON.stringify(data.value));
            idlRucs.value = [...rucs.value];
        }
    });

    return {
        rucs,
        idlRucs,
        isRucsLoading: isFetching,
        rucsHasError: isError,
        refetch
    };
};

export default useRucs;
