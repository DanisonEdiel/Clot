import { api } from '@/api/axios';
import type { Plans } from '@/models/Plans';
import { useMutation } from '@tanstack/vue-query';
import { AxiosRequestConfig } from 'axios';

const savePlan = async (
    plan: Partial<Plans>
): Promise<{
    plan: Plans;
    message: string;
}> => {
    const { data } = await api.post('/plan/add', plan);
    return data;
};

const updatePlan = async (plan: {
    file: string;
    plan_id: string;
    tenant_id: string;
    admin_id: number;
}): Promise<{
    plan: Plans;
    message: string;
}> => {
    var bodyFormData = new FormData();
      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
    
      bodyFormData.append("file", plan.file);
      bodyFormData.append("admin_id", plan.admin_id.toString());
      bodyFormData.append("tenant_id", plan.tenant_id);
      bodyFormData.append("plan_id", plan.plan_id);
    const { data } = await api.post(`/admin/system/change-plan`,bodyFormData);
    return data;
};

const deletePlan = async (id: number): Promise<any> => {
    const { data } = await api.delete(`/plan/delete/${id}`);
    return data;
};

const usePlansAdminMutations = () => {
    const savePlanMutations = useMutation({ mutationFn: savePlan });
    const updatePlanMutations = useMutation({ mutationFn: updatePlan });
    const deletePlanMutations = useMutation({ mutationFn: deletePlan });

    return {
        savePlanMutations,
        updatePlanMutations,
        deletePlanMutations
    };
};

export default usePlansAdminMutations;
