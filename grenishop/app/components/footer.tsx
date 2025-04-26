"use client";

import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (fullHeight <= windowHeight) {
        // Si la page est plus petite que l'écran : afficher direct
        setShowFooter(true);
      } else if (scrollTop + windowHeight >= fullHeight - 50) {
        // Si on arrive en bas : afficher
        setShowFooter(true);
      } else {
        // Sinon cacher
        setShowFooter(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // au cas où dès le chargement

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  if (!showFooter) return null;

  return (
    <footer className="bg-gray-800 text-white text-center p-4 w-full">
      <p className="mb-2">Suivez-nous sur les réseaux sociaux</p>
      <div className="flex justify-center space-x-6 text-xl">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="hover:text-blue-500 transition" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="hover:text-pink-500 transition" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="hover:text-sky-400 transition" />
        </a>
      </div>
    </footer>
  );
}
