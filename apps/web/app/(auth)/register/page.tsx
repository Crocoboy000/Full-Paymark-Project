import type { Metadata } from "next";
import Image from "next/image";
import RegisterForm from "@/components/features/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Create your Paymark account today and start managing your finances with AI-powered insights, seamless transfers, and smart budgeting tools.",
};

export default function RegisterPage() {
  return (
    <>

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
          items-center
          "
      >
        <div className=" hidden md:flex flex-col items-center justify-center ">
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
          Join Us Now In
          <span className="text-primary">
            {" "} Paymark 
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
          Join us today and experience the convenience of managing your finances all in one place.
        </p>
        </div>


        <Image
          src="/login/3dScene.svg"
          alt="Paymark Cards"
          width={350}
          height={350}
          priority
          className="
            hidden md:flex 
            scale-150
          "
        />

      </div>

      <RegisterForm />
          </>
  );
}