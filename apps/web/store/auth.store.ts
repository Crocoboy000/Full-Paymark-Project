import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  User,
  AuthResponse,
} from "@paymark/types";

type AuthState = {
  user: User | null;

  accessToken: string | null;

  isAuthenticated: boolean;

  setAuth: (
    authResponse: AuthResponse,
  ) => void;

  updateUser: (
    user: User,
  ) => void;

  logout: () => void;
};

export const useAuthStore =
  create<AuthState>()(
    persist(
      (set) => ({
        user: null,
        accessToken: null,
        isAuthenticated: false,

        setAuth: (
          authResponse: AuthResponse,
        ) =>
          set({
            user: authResponse.user,
            accessToken:
              authResponse.accessToken,
            isAuthenticated: true,
          }),
          
          updateUser: (
            user: User,
          ) =>
            set({
              user,
            }),
          
        logout: () =>
          set({
            user: null,

            accessToken: null,

            isAuthenticated: false,
          }),
      }),
      {
        name: "paymark-auth",
      },
    ),
  );