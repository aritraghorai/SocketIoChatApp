import api from "@/api/api";
import SignupForm from "@/components/organism/SignupForm";
import AuthTemplate from "@/components/template/AuthTeamplate";
import useAuthState from "@/store/AuthState";
import { RegisterFormState, User } from "@/utils/types";
import { useMutation } from "react-query";

const SignUpPage = () => {
  const { setAuthState } = useAuthState();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: RegisterFormState) => api.signup(data),
    onSuccess: (res) => {
      setAuthState(res.data.data as User, res.data.token);
    },
  });

  return (
    <AuthTemplate>
      <SignupForm onSubmit={mutate} isLoading={isLoading} />
    </AuthTemplate>
  );
};

export default SignUpPage;
