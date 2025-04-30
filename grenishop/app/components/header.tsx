'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [produitsOpen, setProduitsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [panierCount, setPanierCount] = useState(0);
  const { user, isLoggedIn } = useAuthContext();

  const categories = ["Vêtements", "Accessoires", "Chaussures", "Autres"];
  const produitsSimules = [
    "T-shirt",
    "Casquette",
    "Chaussures",
    "Sweat",
    "Pantalon",
    "Lunettes",
    "Montre",
    "Sac",
    "Jean",
  ];

  useEffect(() => {
    // Initialiser le compteur du panier
    const panier = JSON.parse(localStorage.getItem("panier") || "[]");
    setPanierCount(panier.length);

    // Écouter les mises à jour du panier
    const handlePanierUpdated = (event: CustomEvent) => {
      setPanierCount(event.detail);
    };

    window.addEventListener(
      "panierUpdated",
      handlePanierUpdated as EventListener
    );

    return () => {
      window.removeEventListener(
        "panierUpdated",
        handlePanierUpdated as EventListener
      );
    };
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      if (
        categories.some((cat) => cat.toLowerCase() === search.toLowerCase())
      ) {
        router.push(
          `/catalogue?categorie=${encodeURIComponent(search.toLowerCase())}`
        );
      } else {
        router.push(`/search?query=${encodeURIComponent(search)}`);
      }
    }
  };

  useEffect(() => {
    if (search.trim() === "") {
      setSuggestions([]);
    } else {
      const filteredCategories = categories.filter((cat) =>
        cat.toLowerCase().includes(search.toLowerCase())
      );
      const filteredProducts = produitsSimules.filter((prod) =>
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Lien avec l'image */}
            <Link href="./" className="flex items-center text-2xl font-bold text-green-700">
              {/* Image plus grande et alignée à gauche */}
              <img
              src="/logo.png"
              alt="Logo"
              className="h-28 w-28 mr-4"
              />

              
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
                      if (categories.some((cat) => cat.toLowerCase() === item.toLowerCase())) {
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

          <nav className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Accueil
            </Link>
            <Link
              href="/produits"
              className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Produits
            </Link>
            <Link
              href="/panier"
              className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium flex items-center relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Panier
              {panierCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {panierCount}
                </span>
              )}
            </Link>
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="flex items-center text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <span className="mr-2">Mon compte</span>
                  <span className="inline-flex items-center justify-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {user?.Prenom || "Utilisateur"}
                  </span>
                  <svg
                    className={`ml-2 h-5 w-5 transition-transform ${accountMenuOpen ? "rotate-180" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {accountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <Link
                        href="/compte"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Mon profil
                      </Link>
                      <Link
                        href="/commandes"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Mes commandes
                      </Link>
                      <Link
                        href="/favoris"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Ma liste de souhaits
                      </Link>
                      <Link
                        href="/deconnexion"
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Se déconnecter
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/connexion"
                className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Connexion
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
