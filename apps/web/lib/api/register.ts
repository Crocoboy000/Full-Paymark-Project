import { api } from "../api";

import type {
  RegisterInput,
} from "@paymark/validations";

export async function register(
  data: RegisterInput,
) {
  const response = await api.post(
    "/auth/register",
    data,
  );

  return response.data;
}