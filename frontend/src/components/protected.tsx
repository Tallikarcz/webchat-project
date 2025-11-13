"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/authContext";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Not authenticated -> redirect to login
      router.push("/login");
    }
  }, [loading, user, router]);

  // While we don't know auth state, render nothing (or a spinner). When user is null and loading is false
  // the effect above will redirect.
  if (loading || !user) return null;

  return <>{children}</>;
}
