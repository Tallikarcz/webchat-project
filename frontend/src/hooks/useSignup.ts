"use client";

import { useState } from "react";
import { signupUser } from "../lib/api";
import { useRouter } from "next/navigation";

export function useSignup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const data = await signupUser(username, email, password);
      console.log("Signup successful:", data);
      router.push("/");
    } catch (err: any) {
      console.log("Signup failed:", err.message);
      setError(err.message || "Erro ao criar conta");
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleSubmit,
  };
}
