import { api } from '@/api/axios';
import { useMutation } from '@tanstack/vue-query';

const downloadDebitNoteDocument = async (req: { type: 'xml' | 'pdf' | 'todo'; id: number; name: string }): Promise<Blob> => {
    const { data } = await api.put(`/debit-note/download/${req.id}`, req, { responseType: 'blob' });
    console.log(`data`, data);
    return data;
};

const downloadDebitNoteByFilter = async (req: { type: 'xml' | 'pdf'; month: number; year: number; ruc: string }): Promise<Blob> => {
    const { data } = await api.put(`/debit-note/download-debit-note/${req.ruc}`, req, {
        responseType: 'blob'
    });
    return data;
};

const useDebitNoteMutations = () => {
    const downloadDebitNoteDocumentMutation = useMutation({ mutationFn: downloadDebitNoteDocument });
    const downloadDebitNoteByFilterMutation = useMutation({ mutationFn: downloadDebitNoteByFilter });
    return {
        downloadDebitNoteDocumentMutation,
        downloadDebitNoteByFilterMutation
    };
};

export default useDebitNoteMutations;
