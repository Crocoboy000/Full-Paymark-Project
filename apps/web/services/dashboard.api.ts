

import { api } from "@/lib/api";


export const getUser = async () => {
  const  {data}  = await api.get("/user/me");
  return data;
};



export const getDashboardSummary =
  async () => {
    const { data } = await api.get(
      "/dashboard/summary",
    );

    return data;
  };

  export const getDashboardRevenue =
  async () => {
    const { data } = await api.get(
      "/transactions/overview",
    );

    return data;
  };
