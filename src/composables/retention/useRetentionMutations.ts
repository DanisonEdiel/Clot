import { api } from '@/api/axios';
import { useMutation } from '@tanstack/vue-query';

const downloadRetentionDocument = async (req: { type: 'xml' | 'pdf' | 'todo'; id: number; name: string }): Promise<Blob> => {
    const { data } = await api.put(`/retention/download/${req.id}`, req, { responseType: 'blob' });
    console.log(`data`, data);
    return data;
};

const downloadRetentionsByFilter = async (req: { type: 'xml' | 'pdf'; month: number; year: number; ruc: string }): Promise<Blob> => {
    const { data } = await api.put(`/retention/download-retentions/${req.ruc}`, req, {
        responseType: 'blob'
    });
    return data;
};

const useRetentionMutations = () => {
    const downloadRetentionDocumentMutation = useMutation({ mutationFn: downloadRetentionDocument });
    const downloadRetentionsByFilterMutation = useMutation({ mutationFn: downloadRetentionsByFilter });
    return {
        downloadRetentionDocumentMutation,
        downloadRetentionsByFilterMutation
    };
};

export default useRetentionMutations;
