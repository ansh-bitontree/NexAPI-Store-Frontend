"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import userProfile from "@/utils/assets/icons/userProfile.png"
import api from "@/services/api";
import "./DashboardHeader.css"

export default function DashboardHeader() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    api
      .get("/users/me")
      .then((res) => setUsername(res.data.username))
      .catch(console.error);
  }, []);

  return (
    <div className="dashboard-header">
      <div className="dashboard">
        <section className="hero">
          <h1>Dashboard</h1>
          <p>Welcome, {username}</p>
        </section>

        <Image
          className="userProfile"
          src={userProfile}
          alt="user profile"
          width={120}
          height={120}
          onClick={() => router.push("/user")}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
}
