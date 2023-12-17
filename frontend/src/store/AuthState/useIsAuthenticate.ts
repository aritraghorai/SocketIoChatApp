import { useEffect, useState } from "react";
import useAuthState, { authState } from ".";

const useIsAuthenticate = () => {
  const { isAuth: auth } = useAuthState();
  const [isAuth, setIsAuth] = useState(auth());

  useEffect(() => {
    return authState.subscribe((state) => {
      setIsAuth(!!state.user);
    });
  }, []);
  return isAuth;
};

export default useIsAuthenticate;
