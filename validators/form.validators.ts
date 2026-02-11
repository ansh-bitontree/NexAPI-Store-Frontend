import { EMAIL_REGEX, PASSWORD_REGEX } from "../app/utils/regex";

export function validatePassword(password: string): string | null {
  if (!password) return "Password required";

  const errors: string[] = [];

  if (password.length < 8) errors.push("at least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("an uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("a lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("a number");
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push("a special character");
  

  return errors.length > 0 ? `Password must include ${errors.join(", ")}` : null;
}

export function validateUsername(username: string): string | null {
  if (!username?.trim()) return "Username required";
  if (username.length < 3) return "Username must be at least 3 characters";
  return null;
}

export function validateAddress(address: string): string | null {
  if (!address?.trim()) return "Address required";
  if (address.length < 5) return "Address must be at least 5 characters";
  if (address.length > 100) return "Address must be at most 100 characters";
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email) return "E-mail required";
  if (!EMAIL_REGEX.test(email)) return "Invalid E-mail";
  return null;
}

export function validateConfirmPassword(password: string, confirmPassword: string): string | null {
  if (!confirmPassword) return "Confirm password is required";
  if (password !== confirmPassword) return "Passwords do not match";
  return null;
}
