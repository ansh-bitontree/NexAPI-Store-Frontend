"use client";

import { useState, ChangeEvent} from "react";
import "./ForgotPasswordForm.css";
import { EMAIL_REGEX } from "@/utils/regex";
import axios from "axios";
import { toast } from "react-toastify";
import AuthHeader from "../AuthHeader/AuthHeader";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (isSubmitted) {
      if (!EMAIL_REGEX.test(value)) {
        setError("Invalid e-mail");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setSuccess("");

    if (!EMAIL_REGEX.test(email)) {
      setError("Invalid e-mail");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/auth/forget_password`, { email });
      toast.info("If this email exists, a reset link has been sent.");
      setEmail("");
    } catch (e) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="forgot-password" onSubmit={handleSubmit} noValidate>
      <AuthHeader title="Forgot Password" subtitle="Enter your email to reset your password" />
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleChange}
        disabled={loading}
      />

      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send e-mail"}
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
