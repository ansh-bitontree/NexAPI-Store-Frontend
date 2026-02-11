"use client";

import { useState, ChangeEvent} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "./ResetPassword.css";
import AuthHeader from "../AuthHeader/AuthHeader";
import { validateResetPassword } from "../../../validators/auth.validators";
import FormError from "../../FormError/FormError";
import PasswordInput from "../../PasswordInput/PasswordInput";
import PasswordToggle from "../../PasswordInput/PasswordToggle";

interface ResetErrors {
  password?: string;
  confirmPassword?: string;
  form?: string;
}

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<ResetErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateResetPassword(password, confirmPassword);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!token) {
      setErrors({ form: "Invalid or expired reset token." });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            new_password: password,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Reset failed");

      toast.success("Password reset successful!");
      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-wrapper">
      <form className="reset-card" onSubmit={handleSubmit}>
        <AuthHeader title="Reset Password" subtitle="Enter your new password" />

        {errors.form && <FormError message={errors.form} />}

        <div className="password-block">
          <div className="password-field">
            <PasswordInput
              label="New password"
              name="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              error={errors.password}
              show={showPassword}
            />
            <PasswordToggle show={showPassword} onToggle={togglePassword} />
          
            <PasswordInput
              label="Confirm password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              error={errors.confirmPassword}
              show={showPassword}
            />
            <PasswordToggle show={showPassword} onToggle={togglePassword} />
          </div>
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
