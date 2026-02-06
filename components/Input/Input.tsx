'use client';  

import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="input-group">
      {label && <label htmlFor={props.name}>{label}</label>}
      <input 
        id={props.name}
        className={error ? 'input-error' : ''}
        {...props} 
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
}