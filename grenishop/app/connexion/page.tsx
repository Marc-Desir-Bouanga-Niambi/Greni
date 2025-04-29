'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../components/fin';

const mockUser = {
  email: 'jean.dupont@email.com',
  password: '123456',
};

export default function Connexion() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === mockUser.email && password === mockUser.password) {
      router.push('/compte');
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Vidéo de fond */}
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

      {/* Cadre de connexion avec transparence */}
      <div className="w-full max-w-md mx-auto bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-center text-black">Se connecter</h1>

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

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-500 transition"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-white">
            Pas encore de compte ?{' '}
            <a href="/inscription" className="text-green-600 hover:text-green-500 underline">
              Créer un compte
            </a>
          </p>
          <p className="text-sm text-white mt-4">
            Déjà un compte ?{' '}
            <a href="/compte" className="text-green-600 hover:text-green-500 underline">
              Voir mon profil
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
