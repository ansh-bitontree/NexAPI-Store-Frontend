'use client';  

import './LoadingButton.css';  

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  children: React.ReactNode;
}

export default function LoadingButton({ 
  loading, 
  children, 
  ...props 
}: LoadingButtonProps) {
  return (
    <button 
      {...props} 
      disabled={loading || props.disabled} 
      className="btn"
    >
      {loading ? "Loading..." : children}
    </button>
  );
}