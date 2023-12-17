import useAuthState from "@/store/AuthState";
import { Container, Stack, Typography } from "@mui/material";

const Navbar = () => {
  const { logout } = useAuthState();
  return (
    <Stack sx={{ background: "gray", color: "#fff" }} p={1}>
      <Container>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Navbar</Typography>
          <Typography onClick={logout}>Logout</Typography>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Navbar;
