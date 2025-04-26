import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Commentaires = () => {
  const router = useRouter();
  const { productId, rating } = router.query; // Récupère les informations depuis l'URL
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // Logic pour envoyer le commentaire (par exemple à une base de données)
    alert(`Commentaire ajouté pour le produit ${productId} avec une note de ${rating}: ${comment}`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Laissez un commentaire</h1>
      <div className="mb-4 text-center">
        <span className="text-lg font-semibold">Note: </span>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-yellow-400 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={handleCommentChange}
        placeholder="Écrivez votre commentaire ici..."
        rows="5"
        className="w-full p-4 border rounded-md mb-4"
      />
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
      >
        Soumettre
      </button>
    </div>
  );
};

export default Commentaires;
