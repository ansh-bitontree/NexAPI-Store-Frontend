'use client';  // 

import { Eye, EyeOff } from "lucide-react";
import "./PasswordToggle.css";

interface PasswordToggleProps {
  show: boolean;
  onToggle: () => void;
}

export default function PasswordToggle({ show, onToggle }: PasswordToggleProps) {
  return (
    <button
      type="button"
      className="password-toggle-btn"
      onClick={onToggle}
      aria-label={show ? "Hide password" : "Show password"}
    >
      {show ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );
}