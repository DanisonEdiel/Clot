import { api } from "@/api/axios";
import type { User } from "@/models/User";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";

const users = ref<User[]>([]);
const idlUsers = ref<User[]>([]);

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get("/users/index");
  return data;
};

const useUsers = () => {
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

export default useUsers;
