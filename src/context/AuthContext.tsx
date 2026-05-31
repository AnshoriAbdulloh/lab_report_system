/**
 * AuthContext.tsx
 * Provides global authentication state management.
 * Manages login/logout operations with hardcoded demo credentials.
 * No persistence — auth resets on page refresh.
 */

import type React from "react";
import { createContext, useContext, useState, useCallback } from "react";
import type { AuthUser, Role } from "../types";

/** Hardcoded demo accounts for the prototype */
const DEMO_ACCOUNTS: { username: string; password: string; role: Role }[] = [
  { username: "user", password: "user123", role: "User" },
  { username: "teknisi", password: "teknisi123", role: "Teknisi" },
];

interface AuthContextType {
  user: AuthUser | null;
  login: (username: string, password: string) => string | null;
  logout: () => void;
}

interface AuthProviderContext {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderContext) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        return JSON.parse(savedUser) as AuthUser;
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
    return null;
  });

  /**
   * Attempts to log in with the given credentials.
   * @returns null on success, or an error message string on failure.
   */
  const login = useCallback(
    (username: string, password: string): string | null => {
      const trimmedUser = username.trim().toLowerCase(); // menghapus spasi depan belakang dan mengecilkan semua huruf kapital
      const account = DEMO_ACCOUNTS.find(
        (a) => a.username === trimmedUser && a.password === password,
      );

      if (!account) {
        return "Username atau password salah.";
      }

      const loggedInUser: AuthUser = {
        username: account.username,
        role: account.role,
      };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return null;
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access auth context.
 * Must be used within an AuthProvider.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext); // ngambil context
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
