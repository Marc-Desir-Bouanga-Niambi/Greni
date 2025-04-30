// components/StarsRating.tsx
import React, { useState } from 'react';

interface StarsRatingProps {
  initialRating?: number;  // Optionnel, permet d'afficher une note initiale
  onRatingChange?: (rating: number) => void; // Fonction pour transmettre la nouvelle note
}

const StarsRating: React.FC<StarsRatingProps> = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState<number>(initialRating);

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
    if (onRatingChange) {
      onRatingChange(starRating);  // Appel de la fonction passée en prop pour transmettre la nouvelle note
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`cursor-pointer text-2xl ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          onClick={() => handleStarClick(i)}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return <div>{renderStars()}</div>;
};

export default StarsRating;
