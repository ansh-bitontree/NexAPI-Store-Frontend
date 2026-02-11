"use client";

import Button from "../Button";


interface LoadingButtonProps {
  loading: boolean;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

export default function LoadingButton({
  loading,
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button loading={loading} {...props}>
      {children}
    </Button>
  );
}
