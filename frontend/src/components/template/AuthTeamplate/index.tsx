import { Container, Stack } from "@mui/material";

const AuthTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Stack width="100%" height="100vh" justifyContent="center">
        {children}
      </Stack>
    </Container>
  );
};

export default AuthTemplate;
