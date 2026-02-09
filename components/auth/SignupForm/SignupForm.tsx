'use client';  

import { useState } from "react";
import { useRouter } from "next/navigation";  
import Link from "next/link";  
import axios from "axios";
import { toast } from "react-toastify";
import Input from "@/components/Input/Input";  
import PasswordInput from "@/components/PasswordInput/PasswordInput";
import PasswordToggle from "@/components/PasswordInput/PasswordToggle"  
import LoadingButton from "@/components/Button/LoadingButton/LoadingButton";  
import { validateSingup } from "@/validators/auth.validators";  
import "./SignupForm.css";


export default function SignupForm() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    address: "",
    dob: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  interface SignupErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  dob?: string;
  gender?: string;
  form?: string;
}

  const [errors, setErrors] = useState<SignupErrors>({});  
  const [serverError, setServerError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {  
    const { name, value } = e.target;

    const newValues = { ...values, [name]: value };
    setValues(newValues);

    if (isSubmitted) {
      setErrors(validateSingup(newValues));
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {  
    e.preventDefault();
    setServerError("");
    setIsSubmitted(true);

    const validationErrors = validateSingup(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      const payload = {
        username: values.username,
        email: values.email,
        address: values.address || null,
        dob: values.dob ? values.dob : null,
        gender: values.gender || null,
        password: values.password,
        confirm_password: values.confirmPassword,
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/auth/signup`,
            payload,
            {
                headers: {
                "Content-Type": "application/json",
                },
            }
        );

      toast.success("Signup successful! Please login.");
      router.push("/login");  

    } catch  (err: unknown) {
      const error = err as { response?: { data?: { detail?: string } } };
      toast.error(error.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
      <Input 
        label="Username" 
        name="username" 
        value={values.username} 
        onChange={handleChange} 
        error={errors.username} 
      />

      <Input 
        label="Email" 
        name="email" 
        type="email"
        value={values.email} 
        onChange={handleChange} 
        error={errors.email} 
      />

      <Input 
        label="Address" 
        name="address" 
        value={values.address} 
        onChange={handleChange} 
        error={errors.address} 
      />

      <Input 
        label="Date of Birth" 
        type="date" 
        name="dob"
        max={new Date().toISOString().split("T")[0]}
        value={values.dob} 
        onChange={handleChange} 
        error={errors.dob} 
      />

      <div className="select-group">
        <label htmlFor="gender">Gender</label>
        <select 
          id="gender"
          name="gender" 
          value={values.gender} 
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p className="error">{errors.gender}</p>}
      </div>

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

          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            show={showPassword}
          />
          <PasswordToggle show={showPassword} onToggle={togglePassword} />
        </div>
      </div>

      {serverError && <p className="form-error">{serverError}</p>}

      <LoadingButton type="submit" loading={loading}>
        Sign Up
      </LoadingButton>

      <p className="auth-switch">
        Already have an account? <Link href="/login">Login</Link>  
      </p>
    </form>
  );
}