import { api } from '@/api/axios';
import { PaymentDataApiResponse, PayphoneCheckoutResponse } from '@/models/ApiResponse';
import { Plans } from '@/models/Plans';
import { checkoutStore } from '@/stores/checkout';
import { useMutation } from '@tanstack/vue-query';
import axios from 'axios';

const fetchPaymentStatus = async (req: { id: string; clientTxId: string }): Promise<PayphoneCheckoutResponse> => {
    const { token } = checkoutStore();
    let config = { headers: { Authorization: `Bearer ${token}` } };
    const { data } = await axios.post<PayphoneCheckoutResponse>('https://pay.payphonetodoesposible.com/api/button/V2/Confirm', req, config);
    return data;
};

const fetchPaymentData = async (plan: Plans): Promise<PaymentDataApiResponse> => {
    const { data } = await api.post<PaymentDataApiResponse>(`/payment/pay`, plan);
    return data;
};

const savePayment = async (req: { product_id: number; payment: PayphoneCheckoutResponse }): Promise<PaymentDataApiResponse> => {
    const { data } = await api.post<PaymentDataApiResponse>(`/payment/add`, req);
    return data;
};

const useCheckPayment = () => {
    const checkPaymentMutation = useMutation({ mutationFn: fetchPaymentStatus });
    const getPaymentDataMutation = useMutation({ mutationFn: fetchPaymentData });
    const savePaymentMutation = useMutation({ mutationFn: savePayment });
    return {
        checkPaymentMutation,
        getPaymentDataMutation,
        savePaymentMutation
    };
};

export default useCheckPayment;
