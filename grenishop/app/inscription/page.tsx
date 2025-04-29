'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../components/fin'; // Ton footer reste ici

const mockUser = {
  email: 'jean.dupont@email.com',
  password: '123456',
};

export default function Inscription() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (email === mockUser.email && password === mockUser.password) {
      router.push('/compte');
    } else {
      setError('Problème lors de l\'inscription');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Vidéo de fond */}
      <div className="fixed inset-0 -z-10 bg-transparent">
        <video
          ref={videoRef}
          src="/videos/che.mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
      </div>

      {/* Cadre d'inscription flouté */}
      <div className="w-full max-w-md mx-auto bg-white/70 backdrop-blur-lg p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-center text-black">Créer un compte</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition"
          >
            S'inscrire
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-700">
            Déjà un compte ?{' '}
            <a href="/connexion" className="text-green-600 hover:text-green-500 underline">
              Se connecter
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
