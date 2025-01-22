import { api } from "@/api/axios";
import type { AdminUser } from "@/models/AdminUsers";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";

const users = ref<AdminUser[]>([]);
const idlUsers = ref<AdminUser[]>([]);

const fetchUsers = async (): Promise<AdminUser[]> => {
  const { data } = await api.get("/users/index");
  return data;
};

const useAdminUsers = () => {
  const { data, isError, isFetching, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  watch(data, () => {
    if (data.value) {
      users.value = [...data.value];
      idlUsers.value = [...data.value];
    }
  });

  return {
    users,
    idlUsers,
    isUsersLoading: isFetching,
    userHasError: isError,
    refetch,
  };
};

export default useAdminUsers;
