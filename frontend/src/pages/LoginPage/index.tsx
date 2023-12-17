import api from "@/api/api";
import LoginForm from "@/components/organism/LoginForm";
import AuthTemplate from "@/components/template/AuthTeamplate";
import useAuthState from "@/store/AuthState";
import { LoginFormState, User } from "@/utils/types";
import { useMutation } from "react-query";

const LoginPage = () => {
  const { setAuthState } = useAuthState();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: LoginFormState) => api.login(data),
    onSuccess: (res) => {
      setAuthState(res.data.data as User, res.data.token);
    },
  });

  return (
    <AuthTemplate>
      <LoginForm onSubmit={mutate} isLoading={isLoading} />
    </AuthTemplate>
  );
};

export default LoginPage;
