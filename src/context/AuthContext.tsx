/**
 * AuthContext.tsx
 * Provides global authentication state management.
 * Manages login/logout operations with hardcoded demo credentials.
 * Session persists for 3 days of inactivity, then auto-expires.
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

/** Session expires after 3 days of inactivity (in milliseconds) */
const SESSION_DURATION_MS = 3 * 24 * 60 * 60 * 1000;
const STORAGE_USER_KEY = "user";
const STORAGE_LAST_ACTIVE_KEY = "lastActiveAt";

/** Clears all session data from localStorage */
const clearSession = () => {
  localStorage.removeItem(STORAGE_USER_KEY);
  localStorage.removeItem(STORAGE_LAST_ACTIVE_KEY);
};

/** Updates the lastActiveAt timestamp to now (extends the session by another 3 days) */
const refreshSession = () => {
  localStorage.setItem(STORAGE_LAST_ACTIVE_KEY, String(Date.now()));
};

export const AuthProvider = ({ children }: AuthProviderContext) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem(STORAGE_USER_KEY);
    const lastActive = localStorage.getItem(STORAGE_LAST_ACTIVE_KEY);

    if (savedUser && lastActive) {
      const elapsed = Date.now() - Number(lastActive);

      // Session expired — clear and force re-login
      if (elapsed > SESSION_DURATION_MS) {
        clearSession();
        return null;
      }

      // Session still valid — refresh timestamp and restore user
      refreshSession();
      try {
        return JSON.parse(savedUser) as AuthUser;
      } catch {
        clearSession();
        return null;
      }
    }

    // No session data found
    clearSession();
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
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(loggedInUser));
      refreshSession(); // stamp login time
      return null;
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    clearSession(); // wipe user + timestamp on explicit logout
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
