import type { Answer } from "~/domain/type";

export const isValid = (p: unknown): p is Answer =>
  typeof p === "string" || typeof p === "number";

export const throwError = () => {
  throw new Error("The answer need to be string or number.");
};
