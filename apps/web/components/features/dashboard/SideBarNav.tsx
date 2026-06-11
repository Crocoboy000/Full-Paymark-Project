"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarNavLinkProps = {
  href: string;
  label: string;
  icon: React.ElementType;
};

export default function SidebarNav({
  href,
  label,
  icon: Icon,
}: SidebarNavLinkProps) {
  const pathname = usePathname();

  const isActive =
    pathname === href ||
    (href !== "/dashboard" && pathname.startsWith(href));


  return (
    <Link
      href={href}
      className={`
        min-w-full
        group flex items-center gap-2 lg:gap-4 lg:rounded-2xl px-4 py-3
        transition-all duration-300
        justify-start
        ${
          isActive
            ? `
              bg-gradient-to-r
              from-[#FF8975]/90
              via-[#FF8975]/60
              to-[#FF584E]/20
              text-light
              shadow-[0_10px_40px_rgba(255,137,117,0.25)]
            `
            : `
              text-gray1
              hover:bg-white/[0.03]
              hover:text-white
            `
        }
      `}
    >
      <Icon
        className={`
          h-5 w-5 shrink-0
          transition-colors
          ${
            isActive
              ? "text-light"
              : "text-gray1 group-hover:text-light"
          }
        `}
      />

      <span className="lg:text-caption  nav-label
        whitespace-nowrap text-[12px] font-medium flex">
        {label}
      </span>
    </Link>
  );
}