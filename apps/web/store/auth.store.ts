import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthResponse, User } from "@paymark/types";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  hasHydrated: boolean;

  setHasHydrated: (
    hydrated: boolean,
  ) => void;

  setAuth: (
    authResponse: AuthResponse,
  ) => void;

  updateUser: (
    user: User,
  ) => void;

  logout: () => void;
};
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      hasHydrated: false,

      setHasHydrated: (hydrated) =>
        set({
          hasHydrated: hydrated,
       }),

      setAuth: (authResponse) =>
        set({
          user: "user" in authResponse ? authResponse.user : authResponse,
          accessToken:
            "accessToken" in authResponse ? authResponse.accessToken : null,
          isAuthenticated: authResponse.user ? true : false,
        }),

      updateUser: (user) => set({ user }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        }),
    }),
{
  name: "paymark-auth",

  partialize: (state) => ({
    user: state.user,
    accessToken: state.accessToken,
    isAuthenticated:
      state.isAuthenticated,
  }),

  onRehydrateStorage: () => {
    return (state) => {
      state?.setHasHydrated(true);
    };
  },
}
  ),
);
