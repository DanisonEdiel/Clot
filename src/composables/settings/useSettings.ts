import { api } from "@/api/axios";
import type { Settings } from "@/models/Settings";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";

const settings = ref<Settings>({} as Settings);
const customeDate = ref();
const isCustomeDateAvailable = ref(false);

const fetchSettings = async (): Promise<Settings> => {
  const { data } = await api.get("/config/show");
  return data;
};

const useSettings = () => {
  const { data, isError, isFetching } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  });

  watch(data, () => {
    if (data.value) {
      settings.value = { ...data.value };
      if (data.value.customYear && data.value.customMonth) {
        isCustomeDateAvailable.value = true;
        customeDate.value = {
          month: data.value.customMonth,
          year: data.value.customYear,
        };
      }
    }
  });

  return {
    settings,
    isSettingsLoading: isFetching,
    settingsHasError: isError,
    customeDate,
    isCustomeDateAvailable,
  };
};

export default useSettings;
