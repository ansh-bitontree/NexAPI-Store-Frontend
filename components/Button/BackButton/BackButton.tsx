"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const back = () => {
    router.push("/dashboard");
  };

  return (
    <button
      className="back"
      onClick={back}
      style={{
        position: "fixed",
        top: "20px",
        left: "20px",
        zIndex: 1000,
      }}
    >
      Back
    </button>
  );
}
