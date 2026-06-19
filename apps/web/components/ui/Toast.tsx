"use client";

import { useEffect } from "react";
import { X, Check } from "lucide-react";

export type ToastData = {
  type: "success" | "error";
  msg: string;
};

type ToastProps = {
  toast: ToastData;
  onDismiss: () => void;
  duration?: number;
};

export default function Toast({ toast, onDismiss, duration = 3500 }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [toast, onDismiss, duration]);

  return (
    <div
      role="status"
      className={`
        fixed bottom-6 right-4 z-50 flex items-center gap-3
        rounded-xl border bg-dark px-4 py-3
        shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300
        ${toast.type === "success"
          ? "border-primary/30 text-primary"
          : "border-secondary/30 text-secondary"
        }
      `}
    >
      {toast.type === "success" ? (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15">
          <Check className="size-3 text-primary" />
        </div>
      ) : (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary/15">
          <X className="size-3 text-secondary" />
        </div>
      )}

      <span className="text-caption text-light">{toast.msg}</span>
    </div>
  );
}
