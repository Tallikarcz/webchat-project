"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/authContext";
import { useRouter } from "next/navigation";

export function useSignup() {
  const router = useRouter();
  const { signup } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
  // Use AuthContext.signup to create account and refresh auth context
  await signup(username, email, password);
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
