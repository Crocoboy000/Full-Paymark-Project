import { useMutation } from "@tanstack/react-query";

import { register } from "../lib/api/register";

import type {
  RegisterInput,
} from "@paymark/validations";

export function useRegister() {
  return useMutation({
    mutationFn: async (
      data: RegisterInput,
    ) => {
      try {
        return await register(data);
      } catch (error: any) {
        if (!error.response) {
          throw new Error(
            "Unable to connect to server",
          );
        }

        throw new Error(
          error.response.data.message ||
            "Registration failed",
        );
      }
    },
  });
}