import { API_URL } from "../api";

export async function fetchUser() {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include" // Cookies
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
}