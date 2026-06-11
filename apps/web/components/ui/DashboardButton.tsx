"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type DashboardButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  
};

export function DashboardButton({
  children,
  className = "",
  disabled = false,
  type = "button",
  onClick,
}: DashboardButtonProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const ButtonRef = useRef<HTMLButtonElement>(null);
  

  useGSAP(() => {
    if (!glowRef.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
    });

    tl.to(glowRef.current, { autoAlpha:0, scale: 1.3, duration:1.8, ease: "power2.In" })
    .to('.btn', { scale: 0.9, duration:0.5, ease: "power2.out" }, "<")

  }, { scope:ButtonRef });

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      ref={ButtonRef}
      className={`
        relative isolate
        rounded-2xl
        px-2 py-3
        font-medium
        text-white
        transition-all
        duration-300
        hover:scale-[1.02]
        active:scale-[0.98]
        ${className}
      `}
    >
      <div
        ref={glowRef}
        className="
          pointer-events-none
          absolute inset-0
          origin-center
          z-12
          bg-primary
          opacity-10
          rounded-2xl
        "
      />

      <div
        className="
          absolute inset-0
         bg-[linear-gradient(135deg,#6C545B_0%,#FF8975_55%,#FF584E_100%)]
          rounded-2xl
          btn
        "
      />

      <span className="relative text-[12px] whitespace-nowrap z-20">
        {children}
      </span>
    </button>
  );
}