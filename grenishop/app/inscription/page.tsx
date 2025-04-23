import React from 'react';
import Link from 'next/link';

export default function Inscription() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-yellow-800 text-white p-4 flex items-center justify-between">
      <Link href="/.">
        <button className="bg-gray-300 text-black px-4 py-1 rounded">Accueil</button>
        </Link> 
        <h1 className="text-xl font-semibold">INSCRIPTION</h1>
      </header>

      <main className="p-8 flex flex-col lg:flex-row justify-between gap-8">
        <form className="space-y-4 flex-1">
          <div>
            <label className="block text-sm font-medium">Nom :</label>
            <input type="text" className="w-full border px-3 py-1 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Prénom :</label>
            <input type="text" className="w-full border px-3 py-1 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Sexe :</label>
            <select className="w-full border px-3 py-1 rounded">
              <option>Homme</option>
              <option>Femme</option>
              <option>Autre</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Mail :</label>
            <input type="email" className="w-full border px-3 py-1 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Adresse :</label>
            <input type="text" className="w-full border px-3 py-1 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Date de naissance :</label>
            <input type="date" className="w-full border px-3 py-1 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Mot de passe :</label>
            <input type="password" className="w-full border px-3 py-1 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Confirmation du mot de passe :</label>
            <input type="password" className="w-full border px-3 py-1 rounded" />
          </div>
          <button className="bg-gray-800 text-white px-6 py-2 rounded mt-4">S'inscrire</button>
        </form>

        <div className="border w-40 h-40 flex items-center justify-center text-center">
          <p>Insérer une<br />photo de profil</p>
        </div>
      </main>
    </div>
  );
}
