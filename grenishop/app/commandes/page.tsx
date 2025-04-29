'use client';

import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: string;
  quantity: number;
}

interface Order {
  id: number;
  date: string;
  status: string;
  total: string;
  products: Product[];
}

export default function Commandes() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('commandes');
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow px-6 py-8 pt-24 pb-32">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-green-900">Mes Commandes 🧾</h1>

          {orders.length === 0 ? (
            <p className="text-gray-600">Aucune commande enregistrée pour le moment.</p>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-xl shadow-sm p-6 bg-gray-50 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-lg font-semibold text-green-800">Commande #{order.id}</p>
                      <p className="text-sm text-gray-600">Date : {order.date}</p>
                    </div>
                    <div className="text-sm text-gray-700">
                      <span
                        className={`px-3 py-1 rounded-full ${
                          order.status === 'Livrée'
                            ? 'bg-green-200 text-green-700'
                            : order.status === 'En cours'
                            ? 'bg-yellow-200 text-yellow-700'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {order.products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center space-x-4 bg-white p-3 rounded shadow-sm"
                      >
                        <div
                          className="w-20 h-20 bg-gray-200 rounded"
                          style={{
                            backgroundImage: `url(${product.imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        ></div>
                        <div className="flex flex-col">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-sm text-gray-500">
                            Quantité : {product.quantity}
                          </span>
                          <span className="text-sm text-gray-700">{product.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-right font-semibold text-green-800">
                    Total : {order.total}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
