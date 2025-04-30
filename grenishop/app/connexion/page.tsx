"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { authService, ConnexionData } from "../lib/services/auth";

export default function Connexion() {
  const router = useRouter();
  const [formData, setFormData] = useState<ConnexionData>({
    Email: "",
    MotDePasse: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ Nom: string; Prenom: string } | null>(
    null
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.connexion(formData);
      if (response.success) {
        setUser({
          Nom: response.compte.Nom,
          Prenom: response.compte.Prenom,
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || "Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (user) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="fixed inset-0 -z-10 bg-transparent">
          <video
            ref={videoRef}
            src="/videos/tortue.mp4"
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full max-w-md mx-auto bg-white/70 backdrop-blur-lg p-8 rounded-xl shadow-md">
          <h1 className="text-3xl font-semibold mb-6 text-center text-black">
            Bienvenue {user.Prenom} {user.Nom} !
          </h1>
          <p className="text-center text-gray-600">
            Redirection vers la page d'accueil...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="fixed inset-0 -z-10 bg-transparent">
        <video
          ref={videoRef}
          src="/videos/tortue.mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full max-w-md mx-auto bg-white/70 backdrop-blur-lg p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-center text-black">
          Connexion
        </h1>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="MotDePasse"
              className="block text-sm font-medium text-gray-700"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="MotDePasse"
              name="MotDePasse"
              value={formData.MotDePasse}
              onChange={handleChange}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition"
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-700">
            Pas encore de compte ?{" "}
            <Link
              href="/inscription"
              className="text-green-600 hover:text-green-500 underline"
            >
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
