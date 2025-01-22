import { api } from "@/api/axios";
import type { User } from "@/models/User";
import { useMutation } from "@tanstack/vue-query";

const saveUser = async (user: Partial<User>): Promise<any> => {
  const { data } = await api.post("/users/add", user);
  return data;
};

const updateUser = async (user: Partial<User>): Promise<any> => {
  const { data } = await api.put("/users/add", user);
  return data;
};

const deleteUser = async (id: number): Promise<any> => {
  const { data } = await api.delete(`/users/delete/${id}`);
  return data;
};

const useUserMutations = () => {
  const saveUserMutation = useMutation({ mutationFn: saveUser });
  const updateUserMutation = useMutation({ mutationFn: updateUser });
  const deleteUserMutation = useMutation({ mutationFn: deleteUser });

  return {
    saveUserMutation,
    updateUserMutation,
    deleteUserMutation,
  };
};

export default useUserMutations;
