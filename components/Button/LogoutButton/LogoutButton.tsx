"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <button
      className="logout"
      onClick={logout}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      Logout
    </button>
  );
}
