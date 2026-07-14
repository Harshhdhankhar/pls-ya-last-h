"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type MembershipLevel = "Guest" | "Member" | "Founding Member" | "Icon Status";

export type MemberUser = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  memberSince: string;
  membershipLevel: MembershipLevel;
  points: number;
  earlyAccess: boolean;
  isGuest: boolean;
  phone?: string;
};

type ActionResult = { success: true } | { success: false; error: string };

type AuthState = {
  user: MemberUser | null;
  status: "loading" | "authenticated" | "guest" | "unauthenticated";
  signIn: (email: string, password: string, remember: boolean) => Promise<ActionResult>;
  signUp: (name: string, email: string, password: string) => Promise<ActionResult>;
  continueAsGuest: () => void;
  signOut: () => void;
  forgotPassword: (email: string) => Promise<ActionResult>;
  resetPassword: (password: string) => Promise<ActionResult>;
  verifyEmail: (code: string) => Promise<ActionResult>;
  updateProfile: (patch: Partial<MemberUser>) => void;
};

const AuthContext = createContext<AuthState | null>(null);

const SESSION_KEY = "sole-arium.session";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function delay(ms = 850) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readSession(): { user: MemberUser; remember: boolean } | null {
  try {
    const local = localStorage.getItem(SESSION_KEY);
    if (local) return JSON.parse(local);
    const session = sessionStorage.getItem(SESSION_KEY);
    if (session) return JSON.parse(session);
  } catch {
    // ignore malformed storage
  }
  return null;
}

function writeSession(user: MemberUser, remember: boolean) {
  const payload = JSON.stringify({ user, remember });
  if (remember) {
    localStorage.setItem(SESSION_KEY, payload);
    sessionStorage.removeItem(SESSION_KEY);
  } else {
    sessionStorage.setItem(SESSION_KEY, payload);
    localStorage.removeItem(SESSION_KEY);
  }
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MemberUser | null>(null);
  const [status, setStatus] = useState<AuthState["status"]>("loading");

  useEffect(() => {
    const existing = readSession();
    if (existing) {
      setUser(existing.user);
      setStatus(existing.user.isGuest ? "guest" : "authenticated");
    } else {
      setStatus("unauthenticated");
    }
  }, []);

  const value = useMemo<AuthState>(() => {
    const signIn: AuthState["signIn"] = async (email, password, remember) => {
      await delay();
      if (!EMAIL_RE.test(email)) return { success: false, error: "Enter a valid email address." };
      if (password.length < 6) return { success: false, error: "Incorrect email or password." };

      const member: MemberUser = {
        id: "mem_" + email.split("@")[0],
        name: email
          .split("@")[0]
          .replace(/[._]+/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        avatar: null,
        memberSince: "March 2024",
        membershipLevel: "Founding Member",
        points: 2140,
        earlyAccess: true,
        isGuest: false,
      };
      writeSession(member, remember);
      setUser(member);
      setStatus("authenticated");
      return { success: true };
    };

    const signUp: AuthState["signUp"] = async (name, email, password) => {
      await delay();
      if (!name.trim()) return { success: false, error: "Enter your full name." };
      if (!EMAIL_RE.test(email)) return { success: false, error: "Enter a valid email address." };
      if (password.length < 8)
        return { success: false, error: "Password must be at least 8 characters." };

      const member: MemberUser = {
        id: "mem_" + email.split("@")[0],
        name,
        email,
        avatar: null,
        memberSince: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        membershipLevel: "Member",
        points: 100,
        earlyAccess: false,
        isGuest: false,
      };
      writeSession(member, true);
      setUser(member);
      setStatus("authenticated");
      return { success: true };
    };

    const continueAsGuest = () => {
      const guest: MemberUser = {
        id: "guest",
        name: "Guest",
        email: "",
        avatar: null,
        memberSince: "",
        membershipLevel: "Guest",
        points: 0,
        earlyAccess: false,
        isGuest: true,
      };
      writeSession(guest, false);
      setUser(guest);
      setStatus("guest");
    };

    const signOut = () => {
      clearSession();
      setUser(null);
      setStatus("unauthenticated");
    };

    const forgotPassword: AuthState["forgotPassword"] = async (email) => {
      await delay(1000);
      if (!EMAIL_RE.test(email)) return { success: false, error: "Enter a valid email address." };
      return { success: true };
    };

    const resetPassword: AuthState["resetPassword"] = async (password) => {
      await delay(1000);
      if (password.length < 8)
        return { success: false, error: "Password must be at least 8 characters." };
      return { success: true };
    };

    const verifyEmail: AuthState["verifyEmail"] = async (code) => {
      await delay(700);
      if (!/^\d{6}$/.test(code)) return { success: false, error: "Enter the 6-digit code." };
      return { success: true };
    };

    const updateProfile: AuthState["updateProfile"] = (patch) => {
      setUser((prev) => {
        if (!prev) return prev;
        const next = { ...prev, ...patch };
        const existing = readSession();
        writeSession(next, existing?.remember ?? true);
        return next;
      });
    };

    return {
      user,
      status,
      signIn,
      signUp,
      continueAsGuest,
      signOut,
      forgotPassword,
      resetPassword,
      verifyEmail,
      updateProfile,
    };
  }, [user, status]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
