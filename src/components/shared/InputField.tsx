import { useState } from "react";
import type { InputFieldProps } from "../../types/formTypes";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  errors,
  register,
  required,
  message,
  className,
  min,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const togglePasswordVisible = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={id}
        className={`${
          className ? className : ""
        } font-semibold text-sm text-slate-800`}
      >
        {label}
      </label>
      <div className="relative w-full">
        <input
          type={inputType}
          id={id}
          placeholder={placeholder}
          className={`${
            className ? className : ""
          }}w-full pl-2 pr-9 py-2 border outline-none bg-transparent text-slate-800 rounded-md ${
            errors[id]?.message ? "border-red-500" : "border-slate-700"
          }`}
          {...register(id, {
            required: required
              ? { value: true, message: message ?? "This field is required" }
              : false,
            minLength: min
              ? {
                  value: min,
                  message: `Minimum ${min} character${
                    min > 1 ? "s" : ""
                  } required`,
                }
              : undefined,
            pattern:
              type === "email"
                ? {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/,
                    message: "Invalid email",
                  }
                : type === "password"
                ? {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,30}$/,
                    message:
                      "Password must be 8-30 characters, include uppercase, lowercase, number, and special character",
                  }
                : type === "url"
                ? {
                    value:
                      /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                    message: "Please enter a valid URL",
                  }
                : undefined,
          })}
        />

        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisible}
            className="absolute top-5 right-2  transform -translate-y-1/2 text-slate-600"
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>

      {errors[id]?.message && (
        <p className="text-sm font-semibold text-red-600 mt-0">
          {String(errors[id].message)}
        </p>
      )}
    </div>
  );
};

export default InputField;
