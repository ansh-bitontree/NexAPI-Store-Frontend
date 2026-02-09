"use client";

import { useState } from "react";
import { validateUserResetPassword } from "@/validators/user.validators";
import api from "@/services/api";
import { toast } from "react-toastify";
import PasswordInput from "@/components/PasswordInput/PasswordInput";
import PasswordToggle from "@/components/PasswordInput/PasswordToggle";
import { AxiosError } from "axios";

type Props = {
  onBack: () => void;
};

type Values = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

type Errors = Partial<Record<keyof Values, string>>;

export default function UserResetPassword({ onBack }: Props) {
  const [values, setValues] = useState<Values>({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");
    setLoading(true);

    const validationErrors = validateUserResetPassword(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      await api.post("/users/change-password", values);
      toast.success("Password updated!");
      onBack();
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;
      toast.error(error.response?.data?.detail || "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="user_reset" onSubmit={handleReset}>
      <h2>Update Password</h2>

      <div className="password-block">
        <div className="password-field">
          <PasswordInput
            label="Current Password"
            name="current_password"
            value={values.current_password}
            onChange={handleChange}
            error={errors.current_password}
            show={showCurrent}
          />
          <PasswordToggle
            show={showCurrent}
            onToggle={() => setShowCurrent((p) => !p)}
          />
        </div>
      </div>

      <div className="password-block">
        <div className="password-field">
          <PasswordInput
            label="New Password"
            name="new_password"
            value={values.new_password}
            onChange={handleChange}
            error={errors.new_password}
            show={showNew}
          />

          <PasswordInput
            label="Confirm Password"
            name="confirm_password"
            value={values.confirm_password}
            onChange={handleChange}
            error={errors.confirm_password}
            show={showNew}
          />
          <PasswordToggle show={showNew} onToggle={() => setShowNew((p) => !p)} />
        </div>
      </div>

      <div className="actions">
        {serverError && <p className="form-error">{serverError}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onBack}>
          Cancel
        </button>
      </div>
    </form>
  );
}
