import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

interface NavLink {
  name: string;
  href: string;
}

export default function C_Footer() {
  const navLinks: NavLink[] = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "/a-propos" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/95 via-green-950/40 to-transparent backdrop-blur-sm">
      <div className="container mx-auto px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 border-t border-gray-100/10 pt-6">
          <div className="flex items-center space-x-6 md:pl-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-100 hover:text-white transition-colors duration-200 text-sm hover:scale-105 transform"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Section pour les icônes des réseaux sociaux */}
          <div className="flex justify-center space-x-6 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition"
            >
              <FaTwitter />
            </a>
          </div>

          <div className="text-gray-100/80 text-sm font-light tracking-wider md:pr-4">
            <p>© 2024 Grenishop. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
