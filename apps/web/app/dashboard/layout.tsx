import type { Metadata } from "next";
import Providers from "../providers";
import DashboardGuard from "@/guards/DashboardGuard";
import DashboardLoader from "./../../components/sections/dashboard/DashLoader";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your accounts, track transactions, and monitor your financial activity in your Paymark dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div
      className="
        relative
        overflow-hidden
        bg-dark
        flex flex-1 flex-col
        text-light
      "
    >
        <DashboardGuard>
      <Providers>
          <DashboardLoader />
          {children}
      </Providers>
        </DashboardGuard>
    </div>
  );
}