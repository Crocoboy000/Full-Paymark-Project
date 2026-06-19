"use client";

import { AlertTriangle } from "lucide-react";

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  title = "Something went wrong",
  message = "Unable to load your data.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className="
        flex flex-col items-center justify-center
        gap-4
        rounded-3xl
        border border-secondary/20
        bg-dark
        p-8 
        text-center
      "
    >
      <div
        className="
          flex size-16 items-center justify-center
          rounded-2xl
          bg-secondary/10
        "
      >
        <AlertTriangle
          className="
            size-8
            text-secondary
          "
        />
      </div>

      <div>
        <h3
          className="
            text-body
            font-medium
            text-light
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1
            text-caption
            text-gray3
          "
        >
          {message}
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="
            rounded-xl
            bg-primary
            px-4 py-2
            text-caption
            text-dark
            transition
            hover:opacity-90
          "
        >
          Try Again
        </button>
      )}
    </div>
  );
}