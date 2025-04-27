'use client'; // Cette directive marque le composant comme client-side

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import Footer from '../components/footer';

const mockUser = {
  email: 'jean.dupont@email.com',
  password: '123456',
};

export default function Connexion() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérification des identifiants
    if (email === mockUser.email && password === mockUser.password) {
      router.push('/compte');  // Redirection vers la page du profil après la connexion réussie
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow px-6 py-8 pt-24 pb-32">
        <div className="max-w-md mx-auto">
          {/* Image de connexion */}
          <div
            className="flex justify-center items-center h-96 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/bambi.jpg')" }}
          >
            {/* Le contenu de la connexion */}
            <div className="bg-white bg-opacity-75 p-6 rounded-xl shadow-md w-full">
              <h1 className="text-3xl font-semibold mb-6">Se connecter</h1>
              <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-xl shadow-md">
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
                  className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
                >
                  Se connecter
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Pas encore de compte ?{' '}
                  <a href="/inscription" className="text-blue-600 hover:underline">
                    Créer un compte
                  </a>
                </p>
                {/* Lien vers le profil */}
                <p className="text-sm text-gray-600 mt-4">
                  Déjà un compte ?{' '}
                  <a href="/compte" className="text-blue-600 hover:underline">
                    Voir mon profil
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
