'use client';  

import { useState } from "react";
import { useRouter } from "next/navigation";  
import Link from "next/link";  
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import Input from "@/components/Input/Input";
import PasswordInput from "@/components/PasswordInput/PasswordInput";
import PasswordToggle from "@/components/PasswordInput/PasswordToggle";
import LoadingButton from "@/components/Button/LoadingButton/LoadingButton";
import { validateLogin } from "@/validators/auth.validators";  
import './LoginForm.css';

function LoginForm() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  interface LoginErrors{
    email?: string;
    password?: string;
  }
  
  const router = useRouter();  

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitted(true);

  const validationErrors = validateLogin(values);
  setErrors(validationErrors);
  if (Object.keys(validationErrors).length > 0) return;

  try {
    setLoading(true);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/auth/login`,
      values
    );
    localStorage.setItem("token", res.data.access_token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    toast.success("Login successful");
    router.push("/dashboard");
  } catch (err) {
    const error = err as AxiosError;

    if (error.response?.status === 401 || error.response?.status === 400) {
      toast.error("Invalid email or password");
    } else {
      setServerError("Server error. Try again later.");
    }
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {  
    const { name, value } = e.target;

    const newValues = { ...values, [name]: value };
    setValues(newValues);

    if (isSubmitted) {
      setErrors(validateLogin(newValues));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />

      <div className="password-block">
        <div className="password-field">
          <PasswordInput
            label="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            show={showPassword}
          />
          <PasswordToggle
            show={showPassword}
            onToggle={() => setShowPassword(p => !p)}
          />
        </div>
      </div>


      {serverError && <p className="form-error">{serverError}</p>}

      <LoadingButton type="submit" loading={loading}>
        Login 
      </LoadingButton>

      <div className="login-footer">
        <p className="auth-switch">
          New user? <Link href="/signup">Signup</Link>  
        </p>

        <p>
          <Link className="forgot_password" href="/forgotPassword">  
            Forgot Password?
          </Link>
        </p> 
      </div>
    </form>
  );
}

export default LoginForm;