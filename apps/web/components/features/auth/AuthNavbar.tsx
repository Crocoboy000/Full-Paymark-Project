import Link from "next/link";
import { PremiumLogo } from "@/components/ui/Icons";

import { DashboardButton } from "@/components/ui/DashboardButton";

export default function AuthNavbar() {
  return (
    <header
      className="
        sticky top-0 z-50
        flex items-center justify-between
        py-6
      "
    >
      <Link
        href="/"
        className="flex items-center gap-3"
      >
        <PremiumLogo className="h-8 w-auto" />

        <h2
          className="
            text-lg
            font-semibold
            tracking-wide
            text-white
          "
        >
          PAYMARK
        </h2>
      </Link>
      <div className="flex items-center gap-4">
      <p className="text-[12px] hidden md:flex text-gray1">
       Don&apos;t Have An Account?
      </p>
      <DashboardButton className="h-9 w-35">
        <Link href="/register" className="absolute z-50 inset-0 flex items-center justify-center">
          Create Account
        </Link>
      </DashboardButton>
      </div>
    </header>
  );
}