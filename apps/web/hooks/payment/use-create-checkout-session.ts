import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "@/services/payment.api";

export const useCreateCheckoutSession = () =>
  useMutation({
    mutationFn: createCheckoutSession,
  });
