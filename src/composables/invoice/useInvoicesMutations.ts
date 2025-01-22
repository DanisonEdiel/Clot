import { api } from '@/api/axios';
import { useMutation } from '@tanstack/vue-query';

const downloadDocument = async (req: { type: 'xml' | 'pdf' | 'todo'; id: number; name: string }): Promise<Blob> => {
    const { data } = await api.put(`/invoice/download/${req.id}`, req, { responseType: 'blob' });
    console.log(`data`, data);
    return data;
};

const useInvoicesMutations = () => {
    const downloadDocumentMutation = useMutation({ mutationFn: downloadDocument });
    return {
        downloadDocumentMutation
    };
};

export default useInvoicesMutations;
