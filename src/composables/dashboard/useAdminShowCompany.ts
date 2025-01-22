import { api } from '@/api/axios';
import { SingleCompanyApiResponse } from '@/models/ApiResponse';
import { useQuery } from '@tanstack/vue-query';

const fetchCompany = async (id: string): Promise<SingleCompanyApiResponse> => {
    const { data } = await api.get('/admin/system/company/' + id);
    return data;
};

const useAdminShowCompany = (id: string) => {
    const { data,isFetching,isError } = useQuery({ queryKey: ['show-company', id], queryFn: () => fetchCompany(id) });

    return {
        data,isFetching,isError
    };
};

export default useAdminShowCompany;
