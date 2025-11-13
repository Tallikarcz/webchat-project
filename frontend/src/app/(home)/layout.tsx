"use client";

import Protected from "@/components/protected";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  // Protect all pages under the (home) route group and provide a simple
  // shared layout wrapper for spacing / min-height.
  return (
    <Protected>
      <div className="min-h-screen font-sans">{children}</div>
    </Protected>
  );
}
