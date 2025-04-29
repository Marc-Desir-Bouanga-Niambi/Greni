'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../components/fin';

export default function Deconnexion() {
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // On peut déjà supprimer les données de session dès qu'on arrive sur la page
    localStorage.removeItem('userSession'); // Ou supprimer les cookies si nécessaire
  }, []);

  const handleLogout = () => {
    // Supprimer les données de session (localStorage ou cookies)
    localStorage.removeItem('userSession'); // Exemple pour localStorage

    // En cas d'erreur lors de la déconnexion (par exemple API qui échoue), tu peux gérer un état d'erreur ici
    // Par exemple, si l'API de déconnexion échoue, tu peux afficher un message d'erreur

    // Rediriger vers la page de connexion après déconnexion
    router.push('/connexion');
  };

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
        <h1 className="text-3xl font-semibold mb-6 text-center text-white">Se déconnecter</h1>

        <p className="text-white mb-4 text-center">
          Êtes-vous sûr de vouloir vous déconnecter ?
        </p>

        <button
          onClick={handleLogout}
          className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition"
        >
          Se déconnecter
        </button>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
