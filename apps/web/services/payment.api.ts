import { api } from "@/lib/api";

export const createCheckoutSession = async (payload: { amount: number; accountId: string }) => {
  const { data } = await api.post("/stripe/create-checkout-session", payload);
  return data as { url: string; sessionId: string };
};
