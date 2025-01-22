import { api } from '@/api/axios';
import type { Ruc } from '@/models/Ruc';
import { useMutation } from '@tanstack/vue-query';

const saveRuc = async (
    ruc: Partial<Ruc>
): Promise<{
    ruc: Ruc;
    message: string;
}> => {
    const { data } = await api.post('/ruc/add', ruc);
    return data;
};

const synchronizeRuc = async (ruc: Partial<Ruc>): Promise<any> => {
    const { data } = await api.post('/ruc/synchronize', ruc);
    return data;
};

const synchronizeCustomeDate = async (ruc: { id: number; month: number; year: number; documents: string[] }): Promise<any> => {
    const { data } = await api.post('/invoice/custome-date', ruc);
    return data;
};

const updateRuc = async (
    ruc: Partial<Ruc>
): Promise<{
    ruc: Ruc;
    message: string;
}> => {
    const { data } = await api.put(`/ruc/update`, ruc);
    return data;
};

const deleteRuc = async (id: number): Promise<any> => {
    const { data } = await api.delete(`/ruc/delete/${id}`);
    return data;
};

const useRucMutations = () => {
    const saveRucMutations = useMutation({ mutationFn: saveRuc });
    const updateRucMutations = useMutation({ mutationFn: updateRuc });
    const deleteRucMutations = useMutation({ mutationFn: deleteRuc });
    const synchronizeRucMutations = useMutation({ mutationFn: synchronizeRuc });
    const synchronizeCustomeDateMutations = useMutation({ mutationFn: synchronizeCustomeDate });

    return {
        saveRucMutations,
        updateRucMutations,
        deleteRucMutations,
        synchronizeRucMutations,
        synchronizeCustomeDateMutations
    };
};

export default useRucMutations;
