import { api } from "@/api/axios";
import type { User } from "@/models/User";
import { userStore } from "@/stores/useStore";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";

const account = ref<User>({} as User);
const idlAccount = ref<User>({} as User);

const fetchAccount = async (): Promise<User> => {
  const store = userStore();
  const { data } = await api.get(`/account/show/${store.user.id}`);
  return data;
};

const useAccount = () => {
  const { data, isError, isFetching } = useQuery({
    queryKey: ["account"],
    queryFn: fetchAccount,
  });

  watch(data, () => {
    if (data.value) {
      account.value = { ...data.value };
      idlAccount.value = data.value;
    }
  });
  return {
    account,
    idlAccount,
    isAccountLoading: isFetching,
    accountHasError: isError,
  };
};

export default useAccount;
