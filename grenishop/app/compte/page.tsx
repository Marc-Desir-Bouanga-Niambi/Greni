import React from 'react';
import Link from 'next/link';
import Footer from '../components/footer'

export default function Profil() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-yellow-800 text-white p-4 flex items-center justify-between">
        
          <Link href="/connexion">
          <button className="bg-gray-300 text-black px-4 py-1 rounded">Connexion</button>
          </Link>

          <Link href="/inscription">
          <button className="bg-gray-300 text-black px-4 py-1 rounded">Inscription</button>
          </Link>

        <h1 className="text-xl font-semibold">PROFIL</h1>
      </header>

      <main className="p-8 space-y-8 pb-24">
        <section className="flex items-center space-x-6">
          <div>
            <p><strong>Nom de Profil :</strong> Syallis</p>
            <p><strong>Date de création :</strong> 10 janvier 2025</p>
            <p><strong>Nom :</strong> Bouanga Niambi</p>
            <p><strong>Prénom :</strong> Désir</p>
          </div>
          <div className="w-32 h-32 border flex items-center justify-center">
            <span className="text-sm text-gray-600">Photo</span>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">Achats</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="border p-4">
              <p><strong>Oreiller</strong></p>
              <p>Date d'achat : 14 janvier 2025</p>
              <p className="text-sm text-gray-700">Un oreiller qui vous emmènera voir Morphée en 1 min chrono</p>
            </div>
            <div className="border p-4">
              <p><strong>Lit</strong></p>
              <p>Date d'achat : 16 janvier 2025</p>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}
