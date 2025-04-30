"use client";

import { useEffect, useState } from "react";
import {
  Compte,
  getProfil,
  login as loginService,
  logout as logoutService,
} from "../lib/services/auth";

export function useAuth() {
  const [user, setUser] = useState<Compte | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfil()
        .then((userData) => {
          setUser(userData);
        })
        .catch(() => {
          logoutService();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userData = await loginService(email, password);
      setUser(userData);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  return {
    user,
    isLoggedIn: !!user,
    loading,
    login,
    logout,
  };
}
