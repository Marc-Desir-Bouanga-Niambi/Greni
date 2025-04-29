'use client'; // Cette directive marque le composant comme client-side

import { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { useRouter } from 'next/navigation';

export default function Profil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Appel API pour récupérer les données utilisateur
        const res = await fetch('/api/user'); // L'endpoint de votre API
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          console.error('Erreur lors de la récupération des données');
        }
      } catch (error) {
        console.error('Erreur de réseau', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Affichage d'un message de chargement pendant que les données sont récupérées
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow px-6 py-8 pt-24 pb-32 text-center">
          <p>Chargement des données...</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Vérifier si l'utilisateur est connecté et si les données existent
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow px-6 py-8 pt-24 pb-32 text-center">
          <p>Aucune information utilisateur trouvée.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow px-6 py-8 pt-24 pb-32">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-semibold mb-4">Profil de {user.name}</h1>
          <div className="bg-gray-100 p-6 rounded-xl shadow-md">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Date de création:</strong> {new Date(user.creationDate).toLocaleDateString()}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
