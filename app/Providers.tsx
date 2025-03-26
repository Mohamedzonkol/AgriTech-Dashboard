"use client";

import { AuthProvider } from "../contexts/AuthContext";
import { FarmDataProvider } from "../contexts/FarmDataContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <FarmDataProvider>{children}</FarmDataProvider>
    </AuthProvider>
  );
}
