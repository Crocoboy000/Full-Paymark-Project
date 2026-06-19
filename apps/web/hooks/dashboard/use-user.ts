import { useQuery } from "@tanstack/react-query";

import {
  getUser,
} from "@/services/dashboard.api";

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });