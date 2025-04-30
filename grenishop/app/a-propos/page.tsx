import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

export default function APropos() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Header />

      <main className="flex-grow px-6 py-8 pt-24 pb-32">
        <div className="max-w-4xl mx-auto text-gray-800">
          <h1 className="text-4xl font-bold mb-6 text-green-900">À propos de Grenishop</h1>

          <p className="mb-6 text-lg">
            <strong>Grenishop</strong> est une boutique spécialisée dans la vente en gros de produits naturels. Notre objectif est de faciliter l'accès à des produits bruts, sains et respectueux de l’environnement, pour les particuliers comme pour les professionnels soucieux de leur impact.
          </p>

          <h2 className="text-2xl font-semibold text-green-800 mt-10 mb-4">Notre mission 🌱</h2>
          <p className="mb-6">
            Chez Grenishop, nous croyons que la nature offre tout ce dont nous avons besoin. Notre mission est de reconnecter les gens à cette richesse, en proposant des produits naturels en gros, de qualité, et à des prix accessibles.
          </p>

          <h2 className="text-2xl font-semibold text-green-800 mt-10 mb-4">Pourquoi "Grenishop" ? 🍃</h2>
          <p className="mb-6">
            Le nom <strong>Grenishop</strong> est inspiré du mot anglais <em>"green"</em> (vert, nature) et de <em>"shop"</em> (boutique). Il symbolise notre engagement envers une consommation plus verte, plus responsable.
          </p>

          <h2 className="text-2xl font-semibold text-green-800 mt-10 mb-4">Nos valeurs 💚</h2>
          <ul className="list-disc list-inside mb-6">
            <li><strong>Naturel :</strong> Priorité aux produits bruts et authentiques.</li>
            <li><strong>Respect :</strong> Respect de la planète, des producteurs et des consommateurs.</li>
            <li><strong>Confiance :</strong> Transparence sur la qualité et la provenance.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-green-800 mt-10 mb-4">L'équipe derrière Grenishop 👥</h2>
          <p className="mb-2">Nous sommes trois passionnés unis par la même vision :</p>
          <ul className="list-disc list-inside mb-6">
            <li><strong>Keliane Kossa</strong></li>
            <li><strong>Sebastien Guély</strong></li>
            <li><strong>Marc Désir Bouanga Niambi</strong></li>
          </ul>
          <p className="mb-6">
            Ensemble, nous avons lancé Grenishop pour proposer une alternative responsable et accessible à la distribution de produits naturels.
          </p>

          <p className="text-gray-600 text-sm">© 2024 Grenishop. Tous droits réservés.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
