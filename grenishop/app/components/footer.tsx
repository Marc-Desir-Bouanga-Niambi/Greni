import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 w-full mt-auto">
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
