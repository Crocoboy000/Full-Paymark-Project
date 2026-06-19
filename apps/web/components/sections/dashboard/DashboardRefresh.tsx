"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDashboardStore } from "@/store/dashboard.store";

export default function DashboardRefresh() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const { summary, user } =
      useDashboardStore.getState();

    if (summary && user) {
      return;
    }

    void queryClient.refetchQueries({
      type: "active",
    });
  }, [queryClient]);

  return null;
}
