import "./App.css";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import SignUpPage from "./pages/SignUpPage";
import DashBoardPage from "./pages/DashBoardPage";
import useIsAuthenticate from "./store/AuthState/useIsAuthenticate";
import { Toaster } from "react-hot-toast";

const AuthenticateRoute = () => {
  const isAuth = useIsAuthenticate();

  if (!isAuth) {
    console.log("Navigate");
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

const UnAuthenticateRoute = () => {
  const isAuth = useIsAuthenticate();
  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <UnAuthenticateRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthenticateRoute />,
    children: [
      {
        path: "dashboard",
        element: <DashBoardPage />,
      },
    ],
  },
]);

function App() {
  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("connected");
  //   });
  //   socket.on("disconnect", () => {
  //     console.log("disconnected");
  //   });
  //   socket.on("message", (data: string) => {
  //     console.log(data);
  //     setMessages((prev) => [...prev, data]);
  //   });
  // }, []);
  //
  // const [messages, setMessages] = useState<Array<string>>([]);
  // const [message, setMessage] = useState("");
  //
  // const sendMessage = () => {
  //   socket.emit("message", message);
  // };
  return (
    <ThemeProvider theme={theme}>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
