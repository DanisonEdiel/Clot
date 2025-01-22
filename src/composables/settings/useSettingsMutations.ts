import { api } from "@/api/axios";
import type { Settings } from "@/models/Settings";
import { useMutation } from "@tanstack/vue-query";

const updateSettings = async (settings: Partial<Settings>): Promise<any> => {
  const { data } = await api.put("/config/update", settings);

  return data;
};

const useSettingsMutations = () => {
  const updateSettingsMutations = useMutation({ mutationFn: updateSettings });
  return {
    updateSettingsMutations,
  };
};

export default useSettingsMutations;
