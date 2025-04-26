'use client';

import { useParams, useRouter } from 'next/navigation';

const produits = [
  {
    id: '1',
    nom: 'T-shirt oversize',
    prix: 25,
    description: 'Un t-shirt super confort en coton bio.',
  },
  {
    id: '2',
    nom: 'Jean slim',
    prix: 50,
    description: 'Jean slim stretch pour tous les jours.',
  },
];

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const produit = produits.find(p => p.id === params.id);

  if (!produit) {
    return <p>Produit introuvable</p>;
  }

  return (
    <div>
      <h1>{produit.nom}</h1>
      <p>{produit.description}</p>
      <p>Prix : {produit.prix} €</p>
      <button onClick={() => router.back()}>← Retour</button>
    </div>
  );
}
