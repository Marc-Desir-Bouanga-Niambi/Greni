import { useState } from "react";

interface CommandeFormProps {
  onSubmit: (data: {
    adresse_livraison: string;
    ville: string;
    code_postal: string;
    pays: string;
    telephone: string;
    email: string;
  }) => void;
  total: number;
}

export default function CommandeForm({ onSubmit, total }: CommandeFormProps) {
  const [formData, setFormData] = useState({
    adresse_livraison: "",
    ville: "",
    code_postal: "",
    pays: "",
    telephone: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Informations de livraison
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="adresse_livraison"
              className="block text-sm font-medium text-gray-700"
            >
              Adresse de livraison
            </label>
            <input
              type="text"
              id="adresse_livraison"
              name="adresse_livraison"
              required
              value={formData.adresse_livraison}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="ville"
              className="block text-sm font-medium text-gray-700"
            >
              Ville
            </label>
            <input
              type="text"
              id="ville"
              name="ville"
              required
              value={formData.ville}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="code_postal"
              className="block text-sm font-medium text-gray-700"
            >
              Code postal
            </label>
            <input
              type="text"
              id="code_postal"
              name="code_postal"
              required
              value={formData.code_postal}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="pays"
              className="block text-sm font-medium text-gray-700"
            >
              Pays
            </label>
            <input
              type="text"
              id="pays"
              name="pays"
              required
              value={formData.pays}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="telephone"
              className="block text-sm font-medium text-gray-700"
            >
              Téléphone
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              required
              value={formData.telephone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Récapitulatif de la commande
        </h2>
        <div className="flex justify-between items-center">
          <span className="text-lg">Total à payer</span>
          <span className="text-2xl font-bold text-green-700">
            {total.toFixed(2)}€
          </span>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
        >
          Confirmer la commande
        </button>
      </div>
    </form>
  );
}
