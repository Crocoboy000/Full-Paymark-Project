
import { api } from "@/lib/api";
import type { CreateAccountInput } from "@paymark/validations";


export const getAccounts = async () => {
  const { data } = await api.get("/account");
  return data;
};


export const createAccount = async (
  payload: CreateAccountInput,
) => {
  const { data } = await api.post(
    "/account",
    payload,
  );

  return data;
};