import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 w-full mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left">
        
        {/* Colonne gauche : Liens */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
          <a href="/" className="hover:text-gray-400 transition">Accueil</a>
          <a href="/a-propos" className="hover:text-gray-400 transition">À propos</a>
          <a href="/contact" className="hover:text-gray-400 transition">Contact</a>
        </div>

        {/* Colonne centre : Réseaux sociaux */}
        <div className="mb-4 md:mb-0 text-center">
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
        </div>

        {/* Colonne droite : Droits réservés */}
        <div className="text-sm text-gray-400 md:text-right">
          © 2025 Grenishop. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
