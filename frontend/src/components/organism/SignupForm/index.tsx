import { Avatar, Stack, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { object, string } from "zod";
import { useForm } from "react-hook-form";
import { RegisterFormState } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import LoadingButton from "@/components/molecules/LoadingButton";

interface SignUpFormProps {
  onSubmit: (data: RegisterFormState) => void;
  isLoading?: boolean;
}

const schema = object({
  name: string().min(3),
  email: string().email(),
  password: string().min(8),
});

const SignupForm = ({ onSubmit, isLoading }: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormState>({
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
          Sign Up
        </Typography>
      </Stack>
      <Stack component="form" gap={3} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          {...register("name")}
          error={!!errors.email?.message}
          helperText={errors.email?.message}
        />
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
          disabled={!isValid}
          fullWidth
          isLoading={isLoading}
        >
          Sign Up
        </LoadingButton>
      </Stack>
      <Typography variant="body2" align="center">
        Have an account? <Link to="/login">Login</Link>
      </Typography>
    </Stack>
  );
};

export default SignupForm;
