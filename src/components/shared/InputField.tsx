import type { InputFieldProps } from "../../types/formTypes";

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
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`${
          className ? className : ""
        } px-2 py-2 border outline-none bg-transparent text-slate-800 rounded-md ${
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

      {errors[id]?.message && (
        <p className="text-sm font-semibold text-red-600 mt-0">
          {String(errors[id].message)}
        </p>
      )}
    </div>
  );
};

export default InputField;
