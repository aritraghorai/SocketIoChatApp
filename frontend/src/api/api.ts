import { LoginFormState } from "@/utils/types";
import ApiClient from "./axios";

const login = (data: LoginFormState) => {
  return ApiClient.post("/user/login", data);
};

const signup = (data: LoginFormState) => {
  return ApiClient.post("/user/register", data);
};

export default {
  login,
  signup,
};
