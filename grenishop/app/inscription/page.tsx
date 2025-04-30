"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { authService, InscriptionData } from "../lib/services/auth";

export default function Inscription() {
  const router = useRouter();
  const [formData, setFormData] = useState<InscriptionData>({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
  });
  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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

    if (formData.motDePasse !== confirmationMotDePasse) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    try {
      await authService.inscription(formData);
      setSuccess(true);
      setTimeout(() => {
        router.push("/connexion");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de l'inscription");
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

  if (success) {
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
            Inscription réussie !
          </h1>
          <p className="text-center text-gray-600">
            Redirection vers la page de connexion...
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
          Inscription
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
              htmlFor="nom"
              className="block text-sm font-medium text-gray-700"
            >
              Nom
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="prenom"
              className="block text-sm font-medium text-gray-700"
            >
              Prénom
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="motDePasse"
              className="block text-sm font-medium text-gray-700"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="motDePasse"
              name="motDePasse"
              value={formData.motDePasse}
              onChange={handleChange}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmationMotDePasse"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirmationMotDePasse"
              name="confirmationMotDePasse"
              value={confirmationMotDePasse}
              onChange={(e) => setConfirmationMotDePasse(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition"
          >
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-700">
            Déjà un compte ?{" "}
            <Link
              href="/connexion"
              className="text-green-600 hover:text-green-500 underline"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
