"use client";

import { Inbox } from "lucide-react";
import { cn } from './../../lib/utils';
import Link from "next/link";


type EmptyStateProps = {
  title: string;
  message: string;
  link?: string;
  className?: string;
};

export default function EmptyState({
  title,
  message,
  className,
  link
  
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        "gap-4",
        "rounded-3xl",
        "border border-gray2/10",
        "bg-dark",
        "p-8",
        "text-center",
        className
      )}
    >
      <div
        className="
          flex size-16 items-center justify-center
          rounded-2xl
          bg-gray2/10
        "
      >
        <Inbox
          className="
            size-8
            text-gray2
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
            text-[14px]
            text-gray3
          "
        >
          {message}{" "}
          {
            link && (
              <Link href={link || ""} className="text-secondary underline text-[12px]">
                From here.</Link>
            )
          }
          
        </p>
      </div>
    </div>
  );
}