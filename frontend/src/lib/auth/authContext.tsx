"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { fetchUser } from "./fetchUser";
import { loginUser, API_URL } from "../api";
import { User } from "@/types/user";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch current user on app load
  useEffect(() => {
    fetchUser()
      .then(data => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    await loginUser(email, password);
    const data = await fetchUser(); // fetch current user after login
    setUser(data);
    router.push("/dashboard");
  };

  // Signup function
  const signup = async (username: string, email: string, password: string) => {
    // call signup API which sets the cookie, then refresh current user
    const { signupUser } = await import("../api");
    await signupUser(username, email, password);
    const data = await fetchUser();
    setUser(data);
    router.push("/dashboard");
  };

  // Logout function - call backend to clear cookie then clear local state
  const logout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      // ignore network errors — continue to clear client state
      console.warn("Logout request failed:", err);
    }
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
