import { api } from "@/api/axios";
import type { LoginResponse } from "@/models/ApiResponse";
import type { CreateAccountRequest, LoginRequest } from "@/models/Login";
import { useMutation } from "@tanstack/vue-query";

const postLogin = async (
  loginRequest: LoginRequest
): Promise<LoginResponse> => {
  const { data } = await api.post("/auth/login", loginRequest);
  return data;
};
const createAccount = async (
  createAccountRequest: CreateAccountRequest
): Promise<LoginResponse> => {
  const { data } = await api.post("/auth/register", createAccountRequest);
  return data;
};

const useLogin = () => {
  const postLoginMutation = useMutation({ mutationFn: postLogin });
  const createAccountMutation = useMutation({ mutationFn: createAccount });
  return {
    createAccountMutation,
    postLoginMutation
  };
};

export default useLogin;
