"use client";

import { Eye, EyeOff } from "lucide-react";

type FormFieldProps = {
  field: any;
  label: string;
  placeholder: string;
  icon: React.ReactNode;

  type?: string;

  showPassword?: boolean;
  setShowPassword?: (
    value: boolean,
  ) => void;
};

export function FormField({
  field,
  label,
  placeholder,
  icon,
  type = "text",
  showPassword,
  setShowPassword,
}: FormFieldProps) {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <label
          className="
            text-sm
            text-gray1
          "
        >
          {label}
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
          {icon}

          <input
            type={field.name === 'email' ? 'email' : 'text' as any}
            value={field.state.value}
            onChange={(e) =>
              field.handleChange(
                e.target.value,
              )
            }
            onBlur={field.handleBlur}
            placeholder={placeholder}
            className="
              w-full
              bg-transparent
              text-white
              outline-none
            "
          />

          {setShowPassword && (
            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword,
                )
              }
            >
              {showPassword ? (
                <EyeOff
                  size={18}
                  className="text-gray1"
                />
              ) : (
                <Eye
                  size={18}
                  className="text-gray1"
                />
              )}
            </button>
          )}
        </div>
      </div>

      {field.state.meta.errors[0] && (
        <p
          className="
            ml-4
            mt-1
            text-[10px]
            text-secondary
          "
        >
          {String(
            field.state.meta.errors[0],
          )}
        </p>
      )}
    </div>
  );
}