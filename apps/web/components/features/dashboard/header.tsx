"use client";

import Input from "@/components/ui/Input";
import {
  SearchIcon,
} from "@/components/ui/Icons";
import NotificationPanel from "@/components/features/dashboard/NotificationPanel";

import { useDashboardStore } from "@/store/dashboard.store";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import Image from "next/image";


export default function Header() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const clearDashboard = useDashboardStore(
    (state) => state.clearDashboard,
  );

  const user =
    useDashboardStore(
      (state) => state.user,
    );
  
    const userLoading =
      useDashboardStore(
        (state) => state.userLoading,
      );
  
    const userError =
      useDashboardStore(
        (state) => state.userError,
      );

  const handleLogout = () => {
    logout();
    clearDashboard();
    router.replace("/login");
  };
  
    if (userLoading) {
      return (
        <section
          className="
            rounded-3xl
            col-span-12
            md:col-span-4
            xl:col-span-2
            border border-light/5
            p-5
          "
        >
          Loading accounts...
        </section>
      );
    }
  
    if (userError) {
      return (
        <section
          className="
            rounded-3xl
            col-span-12
            md:col-span-4
            xl:col-span-2
            border border-light/5
            p-5
          "
        >
          {userError}
        </section>
      );
    }


  return (
    <header className="flex flex-col items-end gap-8 px-4 md:px-6 text-light">
      <nav
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >
        <div className="flex-1 sm:flex hidden">
          <Input
            icon={
              <SearchIcon
                className="
                  size-5
                  text-light/30
                "
              />
            }
            name="search"
            placeholder="Search anything..."
            type="text"
          />
        </div>

        <div
          className="
            flex
            items-center
            gap-4
            ml-auto
          "
        >
          <NotificationPanel />

          <div className="flex items-center gap-3">
            <Image
              src="/James.png"
              alt="User Avatar"
              width={44}
              height={44}
              quality={100}
              className="
                size-11
                rounded-full
                shrink-0
              "
            />

            <div className="hidden lg:flex flex-col">
              <h3
                className="
                  text-caption
                  font-medium
                "
              >
                {user?.firstName || "Loading..."}

              </h3>

              <p
                className="
                  text-caption
                  text-light/50
                "
              >
                {user?.email}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Log out"
              className="
                flex items-center gap-2
                rounded-xl border border-light/10
                px-3 py-2
                text-caption text-gray3
                transition-colors duration-200
                hover:border-secondary/30
                hover:text-secondary
              "
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="flex w-full flex-col ">
        <h1
          className="
            text-h5
            md:text-h4
            lg:text-h3
            font-medium
            tracking-tight
          "
        >
          Good Morning,
          {" "}
          {user?.firstName  || "Loading..."}
        </h1>

        <p
          className="
            mt-2
            text-[12px]
            md:text-caption
            text-light/50
          "
        >
          Check all the growth that your
          financial health has experienced.
        </p>
      </div>
    </header>
  );
}