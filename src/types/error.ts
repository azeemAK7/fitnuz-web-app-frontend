import type { AxiosError } from "axios";

export type APIError = AxiosError<{ [key: string]: string }>;

export const getErrorMessage = (err: unknown): string =>
  (err as APIError)?.response?.data?.message || "Internal Server Error";

export const getFieldErrors = (err: unknown, fields: string[]): string => {
  const errorData = (err as APIError)?.response?.data;

  for (const field of fields) {
    if (errorData?.[field]) return errorData[field];
  }

  return getErrorMessage(err);
};
