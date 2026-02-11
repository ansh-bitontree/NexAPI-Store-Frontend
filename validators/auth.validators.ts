import { validatePassword, validateUsername, validateAddress, validateEmail, validateConfirmPassword } from "./form.validators";
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

export function validateSignup(values: SignupValues): SignupErrors {
  const errors: SignupErrors = {};

  const usernameError = validateUsername(values.username);
  if (usernameError) errors.username = usernameError;

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const addressError = validateAddress(values.address);
  if (addressError) errors.address = addressError;

  const dobError = validateDOB(values.dob);
  if (dobError) errors.dob = dobError;

  if (!values.gender) errors.gender = "Gender required";

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;

  const confirmError = validateConfirmPassword(values.password, values.confirmPassword);
  if (confirmError) errors.confirmPassword = confirmError;

  return errors;
}

// ========================
// Login Validation
// ========================

interface LoginValues {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

export function validateLogin(values: LoginValues): LoginErrors {
  const errors: LoginErrors = {};

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = values.password ? undefined : "Password required";
  if (passwordError) errors.password = passwordError;

  return errors;
}

// ========================
// Reset Password Validation
// ========================

export interface ResetPasswordErrors {
  password?: string;
  confirmPassword?: string;
}

export function validateResetPassword(password: string, confirmPassword: string): ResetPasswordErrors {
  const errors: ResetPasswordErrors = {};

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  const confirmError = validateConfirmPassword(password, confirmPassword);
  if (confirmError) errors.confirmPassword = confirmError;

  return errors;
}
