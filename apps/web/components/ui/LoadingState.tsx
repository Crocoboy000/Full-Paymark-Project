"use client";

import { Loader2 } from "lucide-react";

type LoadingStateProps = {
  title?: string;
  message?: string;
};

export default function LoadingState({
  title = "Loading",
  message = "Fetching your data...",
}: LoadingStateProps) {
  return (
    <div
      className="
        flex flex-col items-center justify-center
        gap-4
        rounded-3xl
        border border-primary/10
        bg-dark
        p-8
        text-center
      "
    >
      <div
        className="
          flex size-16 items-center justify-center
          rounded-2xl
          bg-primary/10
        "
      >
        <Loader2
          className="
            size-8
            animate-spin
            text-primary
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
    </div>
  );
}