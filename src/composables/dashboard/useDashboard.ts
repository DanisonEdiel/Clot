import { api } from '@/api/axios';
import { DashboardApiResponse } from '@/models/ApiResponse';
import { tenant } from '@/models/Dashboard';
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';

const dashboardData = ref<DashboardApiResponse>();

const fetchDashboard = async (): Promise<DashboardApiResponse> => {
    const { data } = await api.get<DashboardApiResponse>('/dashboard');
    return data;
};
const useDashboard = () => {
    const { data, isError, isFetching, refetch } = useQuery({
        queryKey: ['dashboard'],
        queryFn: fetchDashboard
    });

    watch(data, () => {
        if (data.value) {
            dashboardData.value = data.value;
        }
    });

    return {
        dashboardData,
        isDashboardLoading: isFetching,
        dashboardHasError: isError,
        refetch
    };
};

export default useDashboard;
