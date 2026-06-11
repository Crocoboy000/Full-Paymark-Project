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
import { RegisterSchema } from "@paymark/validations";

import { useForm } from "@tanstack/react-form";

import {
  LoginSchema,
} from "@paymark/validations";

import { useRouter } from "next/navigation";


import { useRegister } from "@/hooks/use-register";
import { User } from "lucide-react";
import { FormField } from "@/components/ui/FormField";






const fields = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Croco",
    icon: User,
    validator:
      RegisterSchema.shape.firstName,
  },

  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Boy",
    icon: User,
    validator:
      RegisterSchema.shape.lastName,
  },

  {
    name: "email",
    label: "Email Address",
    placeholder: "john@example.com",
    icon: Mail,
    validator:
      RegisterSchema.shape.email,
  },
];





export default function RegisterForm() {
  const [showPassword, setShowPassword] =
    useState(false);
  const router = useRouter();
  const [formError, setFormError] = useState("");



  const registerMutation = useRegister();

const form = useForm({
  defaultValues: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  },

onSubmit: async ({ value }) => {
  setFormError("");

  const result =
    RegisterSchema.safeParse(value);

  if (!result.success) {

     return setFormError(result.error.issues[0]?.message);
  }

  try {
    const data =
      await registerMutation.mutateAsync(
        result.data,
      );

    localStorage.setItem(
      "accessToken",
      data.accessToken,
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
      {/* Bottom Glow */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(circle_at_bottom_right,rgba(255,137,117,.18),transparent_45%)]
        "
      />

      {/* Top Glow */}
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
              text-h4
              font-medium
              text-primary
            "
          >
            Create Paymark Account
          </h1>

          <p
            className="
              mt-2
              text-[12px]
              text-gray1
            "
          >
            Create your Paymark account today and start managing your finances like never before.
          </p>
        </header> 

        <form
  className="flex flex-col gap-5"
  onSubmit={(e) => {
    e.preventDefault();
    form.handleSubmit();
  }}
>
{fields.map((input) => {
  const Icon = input.icon;

  return (
    <form.Field
      key={input.name}
      name={input.name as any}
      
      validators={{
        onChange: ({ value }) => {
          const result =
            input.validator.safeParse(
              value,
            );

          if (!result.success) {
            return result.error
              .issues[0]?.message;
          }
        },
      }}
    >
      {(field) => (
        <FormField
          field={field}
          label={input.label}
          placeholder={
            input.placeholder
          }
          icon={
            <Icon
              size={18}
              className="text-gray1"
            />
          }
        />
      )}
    </form.Field>
  );
})}

<form.Field
  name="password"
  validators={{
    onChange: ({ value }) => {
      const result =
        RegisterSchema.shape.password.safeParse(
          value,
        );

      if (!result.success) {
        return result.error
          .issues[0]?.message;
      }
    },
  }}
>
  {(field) => (
    <FormField
      field={field}
      label="Password"
      placeholder="••••••••"
      type={
        showPassword
          ? "text"
          : "password"
      }
      showPassword={
        showPassword
      }
      setShowPassword={
        setShowPassword
      }
      icon={
        <Lock
          size={18}
          className="text-gray1"
        />
      }
    />
  )}
</form.Field>

<form.Field
  name="confirmPassword"
  validators={{
    onChange: ({ value }) => {
      const result =
        RegisterSchema.shape.confirmPassword.safeParse(
          value,
        );

      if (!result.success) {
        return result.error
          .issues[0]?.message;
      }
    },
  }}
>
  {(field) => (
    <FormField
      field={field}
      label="Confirm Password"
      placeholder="••••••••"
      type={
        showPassword
          ? "text"
          : "password"
      }
      showPassword={
        showPassword
      }
      setShowPassword={
        setShowPassword
      }
      icon={
        <Lock
          size={18}
          className="text-gray1"
        />
      }
    />
  )}
</form.Field>


          {/* Remember */}
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
  disabled={registerMutation.isPending}
  className="w-[80%] mx-auto z-10"
>
  {registerMutation.isPending
    ? "Registering..."
    : "Register To Paymark"}
</DashboardButton>
        </form>
      </div>
    </section>
  );
}