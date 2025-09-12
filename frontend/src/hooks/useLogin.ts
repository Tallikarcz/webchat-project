"use client";

import { useState } from "react";
import { loginUser } from "../lib/api";
import { useRouter } from "next/navigation";

export function useLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUser(email, password);
      console.log("Login successful:", data);
      router.push("/");
    } catch (err: any) {
      console.log("Login failed:", err.message);
      setError(err.message || "Erro ao fazer login");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  };
}
