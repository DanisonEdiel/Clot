import { api } from "@/api/axios";
import type { User } from "@/models/User";
import { userStore } from "@/stores/useStore";
import { useMutation } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

const store = userStore();
const updatePhoto = async (photo: File): Promise<User> => {
  var bodyFormData = new FormData();
  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  bodyFormData.append("sign", photo);
  bodyFormData.append("userId", store.user.id.toString());

  const { data } = await api.post(
    "/account/profile-photo-update",
    bodyFormData,
    config
  );
  return data;
};

const updateUserAccount = async (user: User): Promise<any> => {
  const { data } = await api.put("/account/update", user);
  return data;
};

const updateAccountPassword = async (req: {
  oldPassword: string;
  newPassword: string;
  userId: number;
}): Promise<any> => {
  const { data } = await api.put("/account/update-password", req);
  return data;
};
const passwordReset = async (req: { email: string }): Promise<any> => {
  const { data } = await api.post("/auth/password-reset", req);
  return data;
};

const deleteAccount = async (id: number): Promise<any> => {
  const { data } = await api.delete(`/account/delete/${id}`);
  return data;
};
const companyUnsubscribe = async (id: number): Promise<any> => {
  const { data } = await api.delete(`/users/delete/${id}`);
  return data;
};

const useAccountUserMutation = () => {
  const updatePhotoMutation = useMutation({ mutationFn: updatePhoto });
  const updateUserAccountMutation = useMutation({
    mutationFn: updateUserAccount,
  });
  const deleteAccountMutation = useMutation({ mutationFn: deleteAccount });
  const updateAccountPasswordMutation = useMutation({
    mutationFn: updateAccountPassword,
  });
  const companyUnsubscribeMutation = useMutation({
    mutationFn: companyUnsubscribe,
  });
  const passwordResetMutation = useMutation({
    mutationFn: passwordReset,
  });
  return {
    updatePhotoMutation,
    updateUserAccountMutation,
    deleteAccountMutation,
    companyUnsubscribeMutation,
    updateAccountPasswordMutation,
    passwordResetMutation,
  };
};

export default useAccountUserMutation;
