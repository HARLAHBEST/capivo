"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserRole } from "../types";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: UserRole;
  roleLabel: string;
  businessName: string;
}

interface AuthContextType {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (data: RegisterData) => { success: boolean; error?: string };
  logout: () => void;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  businessName: string;
  role: UserRole;
}

// Hardcoded demo users (always present)
const DEMO_USERS: (AuthUser & { password: string })[] = [
  {
    id: "u1",
    name: "Amina Okafor",
    email: "amina@capivo.ng",
    password: "owner123",
    initials: "AO",
    role: "owner",
    roleLabel: "Business Owner",
    businessName: "Ilé Provisions",
  },
  {
    id: "u2",
    name: "Tunde Balogun",
    email: "tunde@capivo.ng",
    password: "manager123",
    initials: "TB",
    role: "worker",
    roleLabel: "Branch Manager",
    businessName: "Ilé Provisions · Yaba",
  },
  {
    id: "u3",
    name: "Audit Team",
    email: "audit@capivo.ng",
    password: "audit123",
    initials: "AT",
    role: "lissafiTeam",
    roleLabel: "Audit & Reconciliation",
    businessName: "Ilé Provisions",
  },
];

const SESSION_KEY = "capivo_session";
const REGISTERED_USERS_KEY = "capivo_registered_users";

const ROLE_LABELS: Record<UserRole, string> = {
  owner: "Business Owner",
  worker: "Branch Manager",
  lissafiTeam: "Audit & Reconciliation",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function loadRegisteredUsers(): (AuthUser & { password: string })[] {
  try {
    const stored = localStorage.getItem(REGISTERED_USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function getAllUsers(): (AuthUser & { password: string })[] {
  if (typeof window === "undefined") return DEMO_USERS;
  return [...DEMO_USERS, ...loadRegisteredUsers()];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (!stored) {
        return null;
      }

      const user = JSON.parse(stored) as AuthUser;
      const all = getAllUsers();
      const valid = all.find((u) => u.id === user.id);

      if (!valid) {
        localStorage.removeItem(SESSION_KEY);
        return null;
      }

      return user;
    } catch {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const all = getAllUsers();
    const match = all.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
    );

    if (!match) {
      return { success: false, error: "Invalid email or password. Please try again." };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pwd, ...user } = match;
    setCurrentUser(user);
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return { success: true };
  };

  const register = (data: RegisterData): { success: boolean; error?: string } => {
    const { name, email, password, businessName, role } = data;

    // Validation
    if (!name.trim() || name.trim().length < 2) {
      return { success: false, error: "Name must be at least 2 characters." };
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: "Please enter a valid email address." };
    }
    if (!password || password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters." };
    }
    if (!businessName.trim()) {
      return { success: false, error: "Please enter your business name." };
    }

    // Check for duplicate email
    const all = getAllUsers();
    if (all.find((u) => u.email.toLowerCase() === email.toLowerCase().trim())) {
      return { success: false, error: "An account with this email already exists." };
    }

    // Build new user
    const newUser: AuthUser & { password: string } = {
      id: "u_" + Date.now(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      initials: getInitials(name.trim()),
      role,
      roleLabel: ROLE_LABELS[role],
      businessName: businessName.trim(),
    };

    // Persist to localStorage
    const registered = loadRegisteredUsers();
    registered.push(newUser);
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(registered));

    // Auto-login the new user
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pwd, ...userWithoutPwd } = newUser;
    setCurrentUser(userWithoutPwd);
    localStorage.setItem(SESSION_KEY, JSON.stringify(userWithoutPwd));

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
