'use client'; // Cette directive marque le composant comme client-side

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import Footer from '../components/footer';

// Exemple de données utilisateur
const userMockData = {
  id: 1,
  name: 'Jean Dupont',
  email: 'jean.dupont@email.com',
  orders: [
    { id: 101, product: 'Produit 1', status: 'Livré', date: '2024-04-01' },
    { id: 102, product: 'Produit 2', status: 'En attente', date: '2024-04-10' },
  ],
};

export default function Compte() {
  const router = useRouter();
  const [user, setUser] = useState(userMockData);

  useEffect(() => {
    // Simuler une récupération de données depuis une API ou un backend
    setUser(userMockData);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow px-6 py-8 pt-24 pb-32">
        <div className="max-w-6xl mx-auto">
          {/* Informations utilisateur */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-4">Mon Compte</h1>
            <div className="bg-gray-100 p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-medium">Informations personnelles</h2>
              <p><strong>Nom:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <div className="mt-4">
                <button
                  onClick={() => router.push('/modifier-compte')} // Lien vers une page de modification
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
                >
                  Modifier mes informations
                </button>
              </div>
            </div>
          </div>

          {/* Commandes passées */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Mes commandes</h2>
            <div className="space-y-4">
              {user.orders.map((order) => (
                <div key={order.id} className="bg-gray-100 p-4 rounded-xl shadow-md">
                  <h3 className="text-lg font-medium">{order.product}</h3>
                  <p><strong>Status:</strong> {order.status}</p>
                  <p><strong>Date:</strong> {order.date}</p>
                  <div className="mt-4">
                    <button
                      onClick={() => router.push(`/commande/${order.id}`)} // Détail de la commande
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition"
                    >
                      Voir les détails
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
