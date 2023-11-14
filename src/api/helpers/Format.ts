import { ValidationError } from "yup";

export const formatYupError = (err: ValidationError) => {
  const error = {
    path: err.path,
    message: err.errors,
  };
  return error;
};
