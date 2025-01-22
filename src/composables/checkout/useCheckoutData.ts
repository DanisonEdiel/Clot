import { api } from '@/api/axios';
import { PaymentDataApiResponse } from '@/models/ApiResponse';
import { useQuery } from '@tanstack/vue-query';
import { ref } from 'vue';

const enable = ref(false);
const planId = ref();

const fetchPaymentData = async (): Promise<PaymentDataApiResponse> => {
    const { data } = await api.post<PaymentDataApiResponse>(`/plans/pay/${planId.value}`);
    return data;
};

const useCheckoutData = () => {
    const { data, isError, isFetching, refetch, isSuccess } = useQuery({
        queryKey: ['paymentData', planId.value],
        queryFn: fetchPaymentData,
        enabled: enable
    });

    return {
        data,
        isDataError: isError,
        isDataLoading: isFetching,
        enable,
        planId,
        isSuccess,
        refetch
    };
};

export default useCheckoutData;
