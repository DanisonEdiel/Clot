import { api } from '@/api/axios';
import { AnnulledVouchers } from '@/models/AnnulledVouchers';
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';

const annulledVouchers = ref<AnnulledVouchers[]>([]);

const fetchWrapperAnnulledVouchers = async (ruc: string): Promise<AnnulledVouchers[]> => {
    const { data } = await api.get('/annulled-vouchers/' + ruc);
    return data;
};

const useAnnulledVouchers = (ruc: string) => {
    const { data, isFetching, isError } = useQuery({ queryKey: ['annulled-vouchers'], queryFn: () => fetchWrapperAnnulledVouchers(ruc) });

    watch(data, () => {
        if (data.value) {
            annulledVouchers.value = JSON.parse(JSON.stringify(data.value));
        }
    });

    return {
        isAnnulledVouchersLoading: isFetching,
        annulledVouchersIsError: isError,
        annulledVouchers
    };
};

export default useAnnulledVouchers;
