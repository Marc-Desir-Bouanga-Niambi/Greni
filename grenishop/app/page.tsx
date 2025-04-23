import Link from 'next/link';

export default function Accueil() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-yellow-800 text-white p-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Bienvenue sur GreniShop</h1>
        <div className="space-x-2">
          <Link href="/connexion">
          <button className="bg-gray-300 text-black px-4 py-1 rounded">Connexion</button>
          </Link>

          <Link href="/inscription">
          <button className="bg-gray-300 text-black px-4 py-1 rounded">Inscription</button>
          </Link>
        </div>
      </header>

      <main className="flex justify-center items-center h-[70vh]">
        <p className="text-lg text-gray-700">Découvrez nos produits, vos achats, et gérez votre profil en toute simplicité.</p>
      </main>

      <footer className="bg-yellow-700 text-white p-4 text-center">
        &copy; 2025 Syallis - Tous droits réservés
      </footer>
    </div>
  );
}
