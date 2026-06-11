import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { LoginRequest } from "@paymark/types";




export function useLogin() {
  return useMutation({
    mutationFn: async (
      data: LoginRequest,
    ) => {
      try {
        const response =
          await api.post(
            "/auth/login",
            data,
          );

        return response.data;
      } catch (error: any) {
        if (!error.response) {
          throw new Error(
            "Unable to connect to server",
          );
        }

        throw new Error(
          error.response.data.message ||
            "Login failed",
        );
      }
    },
  });
}