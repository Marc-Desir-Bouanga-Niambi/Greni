"use client";

import React from "react";

const cartItems = [
  {
    id: 1,
    name: "T-shirt oversize",
    price: 25,
    quantity: 2,
    image: "/images/tshirt.jpg",
  },
  {
    id: 2,
    name: "Jean baggy",
    price: 40,
    quantity: 1,
    image: "/images/jean.jpg",
  },
];

export default function PanierPage() {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mon Panier</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-500">Quantité : {item.quantity}</p>
                <p className="font-medium">{item.price} €</p>
              </div>
            </div>
            <button className="text-red-600 hover:underline">Supprimer</button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center bg-gray-100 p-4 rounded-lg">
        <p className="text-xl font-semibold">Total : {total} €</p>
        <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
          Valider la commande
        </button>
      </div>
    </div>
  );
}
