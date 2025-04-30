"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../components/fin";
import { useAuthContext } from "../context/AuthContext";

export default function Deconnexion() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { logout } = useAuthContext();

  useEffect(() => {
    // Supprimer le token et déconnecter l'utilisateur
    logout();
    // Rediriger vers la page d'accueil
    router.push("/");
  }, [logout, router]);

  return (
    <div className="relative min-h-screen flex items-center justify-center flex-col">
      {/* Vidéo de fond */}
      <div className="fixed inset-0 -z-10">
        <video
          src="/videos/tortue.mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay sombre */}
      <div className="fixed inset-0 bg-black/50 -z-10" />

      {/* Cadre de déconnexion */}
      <div className="w-full max-w-md mx-auto bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-md z-10">
        <h1 className="text-3xl font-semibold mb-6 text-center text-white">
          Déconnexion en cours...
        </h1>
        <p className="text-white mb-4 text-center">
          Vous allez être redirigé vers la page d'accueil.
        </p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
