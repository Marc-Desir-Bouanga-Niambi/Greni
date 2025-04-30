"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { useAuthContext } from "../context/AuthContext";

export default function Profil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
  });
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
      return;
    }

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token non trouvé");
        }

        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5240";
        console.log("Tentative de récupération du profil...");
        console.log("Token présent:", !!token);
        console.log("URL de l'API:", apiUrl);

        const response = await fetch(`${apiUrl}/api/comptes/profil`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Erreur de réponse:", errorText);
          try {
            const errorData = JSON.parse(errorText);
            throw new Error(
              errorData.message ||
                "Erreur lors de la récupération des données utilisateur"
            );
          } catch (e) {
            throw new Error(
              errorText ||
                "Erreur lors de la récupération des données utilisateur"
            );
          }
        }

        const responseText = await response.text();
        console.log("Réponse texte:", responseText);

        if (!responseText) {
          throw new Error("Réponse vide du serveur");
        }

        const data = JSON.parse(responseText);
        console.log("Données parsées:", data);

        if (!data || typeof data !== "object") {
          throw new Error("Format de données invalide");
        }

        setUser(data);
        setFormData({
          nom: data.nom || "",
          prenom: data.prenom || "",
          email: data.email || "",
          telephone: data.telephone || "",
          adresse: data.adresse || "",
        });
        setError("");
      } catch (error) {
        console.error("Erreur détaillée:", error);
        setError(
          error.message ||
            "Une erreur est survenue lors de la récupération de vos données"
        );
        if (error.message.includes("token") || error.message.includes("401")) {
          localStorage.removeItem("token");
          router.push("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isLoggedIn, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5240";
      console.log("Tentative de mise à jour du profil...");
      console.log("Données à envoyer:", formData);

      const response = await fetch(`${apiUrl}/api/comptes/profil`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erreur de mise à jour:", errorText);
        throw new Error("Erreur lors de la mise à jour du profil");
      }

      const updatedData = await response.json();
      console.log("Profil mis à jour avec succès:", updatedData);
      setUser(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md">
            <strong className="font-bold">Erreur !</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
            <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-green-600 to-green-800">
              <h1 className="text-2xl font-bold text-white">Mon Profil</h1>
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="nom"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nom
                      </label>
                      <input
                        type="text"
                        name="nom"
                        id="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="prenom"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Prénom
                      </label>
                      <input
                        type="text"
                        name="prenom"
                        id="prenom"
                        value={formData.prenom}
                        onChange={handleInputChange}
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
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
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
                        name="telephone"
                        id="telephone"
                        value={formData.telephone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="adresse"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Adresse
                      </label>
                      <textarea
                        name="adresse"
                        id="adresse"
                        rows={3}
                        value={formData.adresse}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Enregistrer
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Nom</h3>
                      <p className="mt-1 text-lg text-gray-900">{user?.nom}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Prénom
                      </h3>
                      <p className="mt-1 text-lg text-gray-900">
                        {user?.prenom}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Email
                      </h3>
                      <p className="mt-1 text-lg text-gray-900">
                        {user?.email}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Téléphone
                      </h3>
                      <p className="mt-1 text-lg text-gray-900">
                        {user?.telephone || "Non renseigné"}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <h3 className="text-sm font-medium text-gray-500">
                        Adresse
                      </h3>
                      <p className="mt-1 text-lg text-gray-900">
                        {user?.adresse || "Non renseignée"}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Modifier
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
