"use client";

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
            <Link href="/" className="text-2xl font-bold text-green-700">
              GreniShop
            </Link>
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
            {isLoggedIn ? (
              <Link
                href="/compte"
                className="flex items-center text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                <span className="mr-2">Mon compte</span>
                <span className="inline-flex items-center justify-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {user?.Prenom || "Utilisateur"}
                </span>
              </Link>
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
