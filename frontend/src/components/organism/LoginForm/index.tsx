import { Avatar, Stack, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { object, string } from "zod";
import { useForm } from "react-hook-form";
import { LoginFormState } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@/components/molecules/LoadingButton";
import { Link } from "react-router-dom";

interface LoginFormProps {
  onSubmit: (data: LoginFormState) => void;
  isLoading?: boolean;
}

const schema = object({
  email: string().email(),
  password: string().min(8),
});

const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormState>({
    resolver: zodResolver(schema),
  });

  return (
    <Stack
      gap={3}
      width="min(90vw,400px)"
      justifyContent="center"
      alignSelf="center"
      sx={{ background: "#e7e5e5", p: 2 }}
      borderRadius={2}
    >
      <Stack justifyContent="center" alignItems="center" gap={2}>
        <Avatar sx={{ color: "red" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          login
        </Typography>
      </Stack>
      <Stack component="form" gap={3} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          {...register("email")}
          error={!!errors.email?.message}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          {...register("password")}
          error={!!errors.password?.message}
          helperText={errors.password?.message}
        />
        <LoadingButton
          variant="contained"
          type="submit"
          fullWidth
          disabled={!isValid}
          isLoading={isLoading}
        >
          login
        </LoadingButton>
      </Stack>
      <Typography variant="body2" align="center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </Typography>
    </Stack>
  );
};

export default LoginForm;
