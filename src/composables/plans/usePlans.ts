import { api } from '@/api/axios';
import { PlansApiResponse } from '@/models/ApiResponse';
import { Plans } from '@/models/Plans';
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';

const plans = ref<Plans[]>([]);

const fetchPlans = async (): Promise<Plans[]> => {
    const { data } = await api.get<PlansApiResponse>('/plans/index');
    return data.plans;
};

const usePlans = () => {
    const { data, isFetching, isError } = useQuery({ queryKey: ['plans'], queryFn: fetchPlans });

    watch(data, () => {
        if (data.value) {
            plans.value = [...data.value];
        }
    });

    return {
        plans,
        isFetching,
        isError
    };
};

export default usePlans;
