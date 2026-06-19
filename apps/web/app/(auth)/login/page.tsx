import type { Metadata } from "next";
import Image from "next/image";
import LoginForm from "@/components/features/auth/LoginFrom";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your Paymark account to access your dashboard, manage transactions, track investments, and monitor your finances securely.",
};

export default function LoginPage() {
  return (
    <section
      className="
        mx-auto
        flex w-full
        flex-col items-center md:gap-8
        md:flex-row lg:justify-between
        h-vh
      "
    >
      <div
        className="
          flex
          w-full 
          md:4/12
          h-
          lg:w-7/12
          gap-12
          flex-col 
          justify-start
          items-start
        "
      >
        <div className="flex flex-col items-center justify-center ">
        <h1
          className="
            w-160
            text-h4
            md:w-90
            font-semibold
            md:text-left
            text-center
            leading-tight
            text-white
            md:text-h3
            lg:text-h3
            mt-8
          "
        >
          Welcome Back
          <br />
          Let's continue your
          <span className="text-primary">
            {" "} Financial Journey
          </span>
        </h1>

        <p
          className="
            mt-1 w-120
            text-center
            text-[14px] text-gray1
            md:text-caption
            md:text-left
            md:w-90
          "
        >
          Access your accounts, monitor transactions,
          track investments and manage your finances
          securely from one dashboard.
        </p>
        </div>

        <div className="flex flex-col items-center w-full">
        <Image
          src="/login/Streamline.svg"
          alt="Paymark Cards"
          width={470}
          height={450}
          priority
          className="
            hidden md:flex
          "
        />
        <Image
          src="/login/Invest.svg"
          alt="Paymark Cards"
          width={470}
          height={350}
          priority
          className="
            hidden md:flex
            scale-90
          "
        />
        </div>

      </div>

      <LoginForm />
    </section>
  );
}