"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./DashboardHeader.css"
import api from "../../services/api";

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
          <h1>NexAPI Store</h1>
          <p>Welcome, {username}</p>
        </section>

        <Image
          className="userProfile"
          src="/images/userProfile.png"
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
