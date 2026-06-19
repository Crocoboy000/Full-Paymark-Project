"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Bell,
  Check,
  CheckCheckIcon,
  X,
  Loader,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
} from "lucide-react";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} from "@/services/notification.api";
import type { Notification } from "@paymark/types";

function NotificationIcon({ title }: { title: string }) {
  if (title.endsWith("Transfer Sent"))
    return <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-primary" />;
  if (title.endsWith("Money Received"))
    return <ArrowDownLeft className="h-5 w-5 flex-shrink-0 text-green-400" />;
  if (title.endsWith("Account Created"))
    return <Wallet className="h-5 w-5 flex-shrink-0 text-blue-400" />;
}

function formatTimestamp(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function NotificationItem({
  notif,
  onMarkRead,
}: {
  notif: Notification;
  onMarkRead: (id: string) => void;
}) {
  return (
    <div
      role="listitem"
      className={`flex items-start gap-3 border-b border-light/5 px-4 py-3 transition-colors ${
        notif.read ? "opacity-60" : "bg-light/[0.02]"
      }`}
    >

      <NotificationIcon title={notif.title} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-light truncate">
          {notif.title}
          </p>
        {notif.message && (
          <p className="mt-0.5 text-caption text-gray-300/70 line-clamp-2">
            {notif.message}
          </p>
        )}
        <p className="mt-1 text-[10px] text-gray-400">
          {formatTimestamp(notif.createdAt)}
        </p>
      </div>

      {!notif.read && (
        <button
          onClick={() => onMarkRead(notif.id)}
          className="mt-0.5 flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] text-primary/80 transition-colors hover:bg-primary/10"
          title="Mark as read"
          aria-label="Mark notification as read"
        >
          <Check className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [notifs, count] = await Promise.all([
        getNotifications(),
        getUnreadCount(),
      ]);
      setNotifications(notifs);
      setUnreadCount(count);
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleMarkRead = async (id: string) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch {
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch {
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative inline-flex items-center justify-center rounded-xl p-2 transition-colors hover:bg-light/5"
        aria-label="Notifications"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Bell className="h-6 w-6 text-light/70 hover:text-light" />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-semibold text-dark">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 top-full z-40 mt-2 w-80 sm:w-96">
            <div className="overflow-hidden rounded-2xl border border-light/10 bg-dark shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between border-b border-light/10 px-4 py-3">
                <h3 className="text-sm font-medium text-light">Notifications</h3>

                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] text-primary transition-colors hover:bg-primary/10"
                    >
                      <CheckCheckIcon className="h-4 w-4" />
                      Mark all read
                    </button>
                  )}

                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-lg p-1 text-gray-300 transition-colors hover:text-light"
                    aria-label="Close notifications"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-light/20">
                {loading && notifications.length === 0 ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader className="h-5 w-5 animate-spin text-gray-400" />
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 py-8 text-center">
                    <Bell className="h-8 w-8 text-gray-300/40" />
                    <p className="text-caption text-gray-300/60">No notifications yet</p>
                  </div>
                ) : (
                  <div role="list" aria-label="Notifications list">
                    {notifications.map((notif) => (
                      <NotificationItem
                        key={notif.id}
                        notif={notif}
                        onMarkRead={handleMarkRead}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
