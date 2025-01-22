import { api } from "@/api/axios";
import { AdminLoginRequest } from "@/models/AdminLogin";
import type { LoginResponse } from "@/models/ApiResponse";
import type { AdminResponse} from "@/models/AdminResponse"
import { useMutation } from "@tanstack/vue-query";

const postLogin = async (
  adminLoginRequest: AdminLoginRequest
): Promise<AdminResponse> => {
  const { data } = await api.post("/admin/login", adminLoginRequest);
  return data;
};

const useAdminLogin = () => {
  const postLoginMutation = useMutation({ mutationFn: postLogin });
  return {
    postLoginMutation
  };
};

export default useAdminLogin;
