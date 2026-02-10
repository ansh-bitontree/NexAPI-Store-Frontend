
import { EMAIL_REGEX, PASSWORD_REGEX } from "../app/utils/regex";
import { validateDOB } from "./dob.validator";

interface SignupValues {
  username: string;
  email: string;
  address: string;
  dob: string;
  gender: string;
  password: string;
  confirmPassword: string;
}

interface SignupErrors {
  username?: string;
  email?: string;
  address?: string;
  dob?: string;
  gender?: string;
  password?: string;
  confirmPassword?: string;
}

export function validateSingup(values: SignupValues): SignupErrors {
  const errors: SignupErrors = {};

  if (!values.username?.trim()) {
    errors.username = "Username required";
  }

  if (!values.email) {
    errors.email = "E-mail required";
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Invalid E-mail";
  }

  if (!values.address?.trim()) {
    errors.address = "Address required";
  }

  const dobError = validateDOB(values.dob);
  if (dobError) errors.dob = dobError;

  if (!values.gender) {
    errors.gender = "Gender required";
  }

  if (!values.password) {
    errors.password = "Password required";
  } else if (!PASSWORD_REGEX.test(values.password)) {
    errors.password =
      "Password must be at least 8 characters and include uppercase, lowercase, and number";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}


interface LoginValues{
  email: string;
  password: string;
}

interface LoginErrors{
  email?: string;
  password?: string;
}


export function validateLogin(values: LoginValues): LoginErrors{
  const errors: LoginErrors = {};


  if (!values.email) {
    errors.email = "E-mail required";
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Invalid E-mail";
  }

   if (!values.password) errors.password = "Password required";
    return errors
}


export interface ResetPasswordErrors {
  password?: string;
  confirmPassword?: string;
}

export function validateResetPassword(
  password: string,
  confirmPassword: string
): ResetPasswordErrors {
  const errors: ResetPasswordErrors = {};

  if (!password) {
    errors.password = "New password is required";
  } else if (!PASSWORD_REGEX.test(password)) {
    errors.password =
      "Password must be 8+ characters and include uppercase, lowercase and number";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}
