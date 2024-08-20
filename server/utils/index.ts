import { ZodError } from "zod";

export function fieldError(error: ZodError) {
  const fieldErrors = error.errors.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
  console.log(fieldErrors);

  return fieldErrors;
}
