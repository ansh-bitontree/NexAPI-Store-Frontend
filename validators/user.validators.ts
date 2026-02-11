import { validatePassword, validateEmail, validateUsername, validateAddress } from "./form.validators";
import { validateDOB } from "./dob.validator";

export type ResetPasswordValues = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

export type ProfileValues = {
  username: string;
  email: string;
  dob: string;
  address: string;
};

export type Errors = Record<string, string>;

// User Reset Password

export function validateUserResetPassword(values: ResetPasswordValues): Errors {
  const errors: Errors = {};

  if (!values.current_password) errors.current_password = "Current password required";

  const newPasswordError = validatePassword(values.new_password);
  if (newPasswordError) errors.new_password = newPasswordError;

  if (values.new_password !== values.confirm_password) {
    errors.confirm_password = "Passwords do not match";
  }

  return errors;
}

// Profile Update Validation

export function validateUpdatedProfile(values: ProfileValues): Errors {
  const errors: Errors = {};

  const usernameError = validateUsername(values.username);
  if (usernameError) errors.username = usernameError;

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const dobError = validateDOB(values.dob);
  if (dobError) errors.dob = dobError;

  const addressError = validateAddress(values.address);
  if (addressError) errors.address = addressError;

  return errors;
}

// Reset Password (by token) Validation

export function validateResetPassword(password: string, confirmPassword: string): Errors {
  const errors: Errors = {};

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  if (!confirmPassword) errors.confirmPassword = "Confirm password is required";
  else if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";

  return errors;
}
