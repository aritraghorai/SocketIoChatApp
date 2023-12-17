import { User } from "@/utils/types";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface AuthState {
  user?: User;
  token?: string;
}

interface AuthAction {
  setUser: (user: User, token: string) => void;
  isAuth: () => boolean;
  logout: () => void;
}

export const authState = create(
  devtools(
    persist<AuthState & AuthAction>(
      (set, get) => ({
        setUser: (user: User, token: string) => set({ user, token }),
        isAuth: () => !!get().user,
        logout: () => set({ user: undefined, token: undefined }),
      }),
      {
        name: "authState",
        getStorage: () => localStorage,
      }
    )
  )
);

authState.subscribe((state) => {
  console.log("AuthState", state);
});

const useAuthState = () => {
  return {
    setAuthState: authState((state) => state.setUser),
    isAuth: authState((state) => state.isAuth),
    logout: authState((state) => state.logout),
    user: authState((state) => state.user),
  };
};

export default useAuthState;
