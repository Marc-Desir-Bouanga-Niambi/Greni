"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Compte,
  getProfil,
  login,
  logout as logoutService,
} from "../lib/services/auth";

interface AuthContextType {
  user: Compte | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<Compte>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Compte | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token dans le contexte:", token);
    if (token) {
      getProfil()
        .then((userData) => {
          console.log("Données utilisateur reçues:", userData);
          setUser(userData);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération du profil:", error);
          localStorage.removeItem("token");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log("Aucun token trouvé");
      setLoading(false);
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      console.log("Tentative de connexion...");
      const userData = await login(email, password);
      console.log("Données utilisateur après connexion:", userData);
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loading,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
