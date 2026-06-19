import { useQuery } from "@tanstack/react-query";

import { getDashboardRevenue } from "@/services/dashboard.api";

export const useRevenue =
  () =>
    useQuery({
      queryKey: [
        "dashboard-overview",
      ],
      queryFn:
        getDashboardRevenue,
    });