'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [produitsOpen, setProduitsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const categories = ['Vêtements', 'Accessoires', 'Chaussures', 'Autres'];
  const produitsSimules = [
    'T-shirt', 'Casquette', 'Chaussures', 'Sweat', 'Pantalon', 'Lunettes', 'Montre', 'Sac', 'Jean'
  ];

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim() !== '') {
      if (categories.some(cat => cat.toLowerCase() === search.toLowerCase())) {
        router.push(`/catalogue?categorie=${encodeURIComponent(search.toLowerCase())}`);
      } else {
        router.push(`/search?query=${encodeURIComponent(search)}`);
      }
    }
  };

  useEffect(() => {
    if (search.trim() === '') {
      setSuggestions([]);
    } else {
      const filteredCategories = categories.filter(cat =>
        cat.toLowerCase().includes(search.toLowerCase())
      );
      const filteredProducts = produitsSimules.filter(prod =>
        prod.toLowerCase().includes(search.toLowerCase())
      );
      setSuggestions([...filteredCategories, ...filteredProducts]);
    }
  }, [search]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProduitsMenu = () => {
    setProduitsOpen(!produitsOpen);
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 shadow" style={{ backgroundColor: '#effff1' }}>
      {/* Logo */}
      <div>
        <Link href="/">
          <Image src="/logo.png" alt="GreniShop Logo" width={100} height={50} />
        </Link>
      </div>

      {/* Barre de recherche */}
      <div className="flex-1 flex justify-center relative">
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          className="w-full max-w-md px-3 py-2 border rounded-md"
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-full mt-2 w-full max-w-md bg-white border border-gray-300 rounded-md shadow z-50">
            {suggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setSearch(item);
                  if (categories.some(cat => cat.toLowerCase() === item.toLowerCase())) {
                    router.push(`/catalogue?categorie=${encodeURIComponent(item.toLowerCase())}`);
                  } else {
                    router.push(`/search?query=${encodeURIComponent(item)}`);
                  }
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Boutons à droite */}
      <div className="flex items-center space-x-6 relative">
        {/* Produits (anciennement Catégories) */}
        <div className="relative">
          <button
            onClick={toggleProduitsMenu}
            className="inline-block mt-auto px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600 transition"
          >
            Produits
          </button>

          {produitsOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-md z-50">
              {categories.map((cat, index) => (
                <Link
                  key={index}
                  href={`/catalogue?categorie=${cat.toLowerCase()}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  {cat}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Compte */}
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="inline-block mt-auto px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600 transition"
          >
            Compte
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-md z-50">
              <Link href="/compte" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Mon Compte</Link>
              <Link href="/commandes" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Mes Commandes</Link>
              <Link href="/favoris" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Mes Favoris</Link>
              <button
                onClick={() => {
                  alert('Déconnecté avec succès');
                  router.push('/connexion');
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Se Déconnecter
              </button>
            </div>
          )}
        </div>

        {/* Panier */}
        <Link
          href="/panier"
          className="inline-block mt-auto px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600 transition"
        >
          Panier
        </Link>
      </div>
    </header>
  );
}
