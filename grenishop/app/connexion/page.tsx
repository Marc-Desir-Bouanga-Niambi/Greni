import React from 'react';
import Link from 'next/link';

export default function Connexion() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-yellow-800 text-white p-4 flex items-center justify-between">
      
      <Link href="/.">
        <button className="bg-gray-300 text-black px-4 py-1 rounded">Accueil</button>
       </Link> 
        <h1 className="text-xl font-semibold">CONNEXION</h1>
      </header>

      <main className="flex flex-col items-center justify-center mt-20 space-y-6">
        <div className="w-full max-w-xs space-y-4">
          <div>
            <label className="block text-sm font-medium">Mail :</label>
            <input type="email" className="w-full border px-3 py-1 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Mot de passe :</label>
            <input type="password" className="w-full border px-3 py-1 rounded" />
          </div>
          <button className="bg-gray-800 text-white w-full py-2 rounded">Valider</button>
        </div>
      </main>
    </div>
  );
}
