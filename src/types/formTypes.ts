import type { FieldErrors, UseFormRegister } from "react-hook-form";

export interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  errors: FieldErrors;
  register: UseFormRegister<any>;
  required?: boolean;
  message?: string;
  className?: string;
  min?: number;
  value?: string;
  placeholder?: string;
}

export interface LoginFormValues {
  userName: string;
  password: string;
}

export interface RegisterFormValues {
  userName: string;
  email: string;
  password: string;
}
