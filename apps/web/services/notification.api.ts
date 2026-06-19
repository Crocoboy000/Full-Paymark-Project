import { api } from "@/lib/api";
import type { Notification } from "@paymark/types";

export const getNotifications = async (): Promise<Notification[]> => {
  const { data } = await api.get("/notification");
  return data;
};

export const getUnreadCount = async (): Promise<number> => {
  const { data } = await api.get("/notification/unread-count");
  return data;
};

export const markAsRead = async (id: string) => {
  await api.patch(`/notification/${id}/read`);
};

export const markAllAsRead = async () => {
  await api.patch("/notification/read-all");
};
