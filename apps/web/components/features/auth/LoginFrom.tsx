"use client";

import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
} from "lucide-react";
import { useState } from "react";

import { DashboardButton } from "@/components/ui/DashboardButton";
import { useForm } from "@tanstack/react-form";

import {
  LoginSchema,
} from "@paymark/validations";
import { useRouter } from "next/navigation";


import { useLogin } from "@/hooks/use-login";
import { useAuthStore } from "@/store/auth.store";

export default function LoginForm() {
  const [showPassword, setShowPassword] =
    useState(false);
  const router = useRouter();
  const [formError, setFormError] = useState("");

  const setAuth =
    useAuthStore(
      (state) => state.setAuth,
    );


    const loginMutation = useLogin();

const form = useForm({
  defaultValues: {
    email: "",
    password: "",
  },

onSubmit: async ({ value }) => {
  setFormError("");

  const result =
    LoginSchema.safeParse(value);

  if (!result.success) {
     return setFormError(result.error.issues[0]?.message);
  }

  try {
    const data =
      await loginMutation.mutateAsync(
        result.data,
      );


    setAuth(
      data
    );

    router.push("/dashboard");

  } catch (error) {
    if (error instanceof Error) {
      setFormError(error.message);
    } else {
      setFormError(
        "Something went wrong",
      );
    }
  }
},
});

  return (
    <section
      className="
        relative isolate
        md:w-12/12
        lg:w-5/12
        overflow-hidden
        rounded-4xl
        border border-white/[0.06]
        bg-dark
        p-8
        md:p-10
      "
    >
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(circle_at_bottom_right,rgba(255,137,117,.18),transparent_45%)]
        "
      />

      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(circle_at_top_left,rgba(255,88,78,.12),transparent_35%)]
        "
      />

      <div className="relative flex flex-col gap-12 py-5 z-10">
         <header className=" text-center">
          <h1
            className="
              text-h3
              font-medium
              text-primary
            "
          >
            Login to Paymark
          </h1>

          <p
            className="
              mt-2
              text-[12px]
              text-gray1
            "
          >
            Enter your credentials to access your
            dashboard.
          </p>
        </header> 

        <form
  className="flex flex-col gap-8"
  onSubmit={(e) => {
    e.preventDefault();
    form.handleSubmit();
  }}
>
<form.Field
  name="email"
  validators={{
    onChange: ({ value }) => {
      const result =
        LoginSchema.shape.email.safeParse(
          value,
        );

      if (!result.success) {
        return result.error.issues[0]
          ?.message;
      }
    },
  }}
>
  {(field) => (
    <div>
                <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="
                text-sm
                text-[var(--gray1)]
              "
            >
              Email Address
            </label>

            <div
              className="
                flex items-center gap-3
                rounded-2xl
                border border-white/[0.05]
                bg-black/20
                px-4 py-3
              "
            >
              <Mail
                size={18}
                className="text-[var(--gray1)]"
              />
      <input
        id="email"
        type="email"
        value={field.state.value}
        onChange={(e) =>
          field.handleChange(
            e.target.value,
          )
        }
        onBlur={field.handleBlur}
        placeholder="email"
        className="
          w-full bg-transparent
          text-white
          outline-none
        "
      />

    </div>
        </div>
      {field.state.meta.errors[0] && (
        <p
          className="
            text-[10px] ml-4 text-secondary
          "
        >
          {
            String(
              field.state.meta.errors[0],
            )
          }
        </p>
      )}
      </div>
  )}
</form.Field>

<form.Field
  name="password"
  validators={{
    onChange: ({ value }) => {
      const result =
        LoginSchema.shape.password.safeParse(
          value,
        );

      if (!result.success) {
        return result.error.issues[0]
          ?.message;
      }
    },
  }}
>
      {(field) => (
        <div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="
              text-sm
              text-[var(--gray1)]
              "
              >
              Password
            </label>

            <div
              className="
                flex items-center gap-3
                rounded-2xl
                border border-light/5
                bg-black/20
                px-4 py-3
              "
            >
              <Lock
                size={18}
                className="text-gray1"
              />


      <input
        id="password"
        type={
          showPassword
          ? "text"
            : "password"
        }
        value={field.state.value}
        onChange={(e) =>
          field.handleChange(
            e.target.value,
          )
        }
        onBlur={field.handleBlur}
        placeholder="••••••••"
        className="
          w-full bg-transparent
          text-white
          outline-none
        "
      />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                >
                {showPassword ? (
                  <EyeOff
                  size={18}
                    className="text-[var(--gray1)]"
                  />
                ) : (
                  <Eye
                  size={18}
                    className="text-[var(--gray1)]"
                    />
                )}
              </button>
            </div>
          </div>

      {field.state.meta.errors[0] && (
        <p
          className="
            text-[10px] ml-4 text-secondary
            w-full
          "
        >
          {
            String(
              field.state.meta.errors[0],
            )
          }
        </p>
      )}
        </div>
        )} 
          </form.Field>
          <div
            className="
            flex items-center
            justify-between
            "
          >
            <label
              className="
                flex cursor-pointer
                items-center gap-2
                text-sm text-gray1
              "
            >
              <input
                type="checkbox"
                className="
                  appearance-none h-4 w-4 rounded-full
                  border-gray3 border-[0.5px]
                bg-dark checked:bg-primary 
                transition-all duration-200 relative" />

              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="
                text-sm
                text-[var(--primary)]
              "
            >
              Forgot Password?
            </Link>
          </div>

{formError && (
  <p
    className="
      text-center
      text-secondary
      text-[12px]
    "
  >
    {formError}
  </p>
)}

<DashboardButton
  type="submit"
  disabled={loginMutation.isPending}
  className="w-[80%] mx-auto"
>
  {loginMutation.isPending
    ? "Logging in..."
    : "Login To Dashboard"}
</DashboardButton>
        </form>
      </div>
    </section>
  );
}