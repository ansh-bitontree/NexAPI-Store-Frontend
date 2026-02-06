'use client';  

import "./PasswordInput.css";

interface PasswordInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  show: boolean;
}

export default function PasswordInput({
  label,
  name,
  value,
  onChange,
  error,
  show,
}: PasswordInputProps) {
  return (
    <div className="password-group">
      <label htmlFor={name}>{label}</label>
      <div className="password-input-wrapper">
        <input
          id={name}
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className={error ? 'input-error' : ''}
        />
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}