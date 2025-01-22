import { api } from '@/api/axios';
import { useMutation } from '@tanstack/vue-query';

const downloadCreditNoteDocument = async (req: { type: 'xml' | 'pdf' | 'todo'; id: number; name: string }): Promise<Blob> => {
    const { data } = await api.put(`/credit-note/download/${req.id}`, req, { responseType: 'blob' });
    console.log(`data`, data);
    return data;
};

const downloadCreditNoteByFilter = async (req: { type: 'xml' | 'pdf'; month: number; year: number; ruc: string }): Promise<Blob> => {
    const { data } = await api.put(`/credit-note/download-credit-notes/${req.ruc}`, req, {
        responseType: 'blob'
    });
    return data;
};

const useCreditNoteMutations = () => {
    const downloadCreditNoteDocumentMutation = useMutation({ mutationFn: downloadCreditNoteDocument });
    const downloadCreditNoteByFilterMutation = useMutation({ mutationFn: downloadCreditNoteByFilter });
    return {
        downloadCreditNoteDocumentMutation,
        downloadCreditNoteByFilterMutation
    };
};

export default useCreditNoteMutations;
