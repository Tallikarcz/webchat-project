"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/authContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogin() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
  await login(email, password);
  toast.success("Login feito com sucesso!");
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
