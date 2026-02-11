"use client";

import { useRouter } from "next/navigation";
import Button from "../Button";

export default function LogoutButton() {
  const router = useRouter();

  const logout = () => {
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "user=; path=/; max-age=0";
    router.push("/login");
  };

  return (
    <Button
      onClick={logout}
      className="logout"
    >
      Logout
    </Button>
  );
}
