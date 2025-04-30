import React from "react";
import Link from "next/link";

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
          <div className="flex-1 flex justify-center">
            <div className="flex items-center space-x-10">
              <a
                href="#"
                className="text-gray-100 hover:text-white transition-all duration-200 transform hover:scale-110 hover:rotate-6"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-100 hover:text-white transition-all duration-200 transform hover:scale-110 hover:-rotate-6"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-100 hover:text-white transition-all duration-200 transform hover:scale-110 hover:rotate-6"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
          <div className="text-gray-100/80 text-sm font-light tracking-wider md:pr-4">
             Grenishop. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
}
