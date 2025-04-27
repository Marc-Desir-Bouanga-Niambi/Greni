'use client';

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim() !== '') {
      router.push(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-stone-100 shadow">
      {/* Logo */}
      <div>
        <Link href="/">
          <Image
            src="/logo.png" 
            alt="GreniShop Logo"
            width={100}
            height={50}
          />
        </Link>
      </div>

      {/* Barre de recherche centrée */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          className="w-full max-w-md px-3 py-2 border rounded-md"
        />
      </div>

      {/* Boutons compte et panier */}
      <div className="flex items-center space-x-6">
        <Link
          href="/compte"
          className="inline-block mt-auto px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600 transition"
        >
          Compte
        </Link>
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
