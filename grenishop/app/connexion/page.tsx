"use client"; // Cette directive marque le composant comme client-side

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { authService, ConnexionData } from "../lib/services/auth";

export default function Connexion() {
  const router = useRouter();
  const [formData, setFormData] = useState<ConnexionData>({
    Email: "",
    MotDePasse: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ nom: string; prenom: string } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.connexion(formData);
      setUser({
        nom: response.compte.Nom,
        prenom: response.compte.Prenom,
      });
      // Attendre un peu avant la redirection pour afficher le message de bienvenue
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.join("\n"));
      } else {
        setError(err.message || "Une erreur est survenue lors de la connexion");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow px-6 py-8 pt-24 pb-32">
        <div className="max-w-md mx-auto">
          {/* Image de connexion */}
          <div
            className="flex justify-center items-center h-96 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/bambi.jpg')" }}
          >
            {/* Le contenu de la connexion */}
            <div className="bg-white bg-opacity-75 p-6 rounded-xl shadow-md w-full">
              <h1 className="text-3xl font-semibold mb-6">Se connecter</h1>
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  {user
                    ? `Bienvenue ${user.prenom} ${user.nom} !`
                    : "Se connecter"}
                </h2>
                {user && (
                  <p className="mt-2 text-center text-sm text-gray-600">
                    Vous allez être redirigé vers la page d'accueil...
                  </p>
                )}
              </div>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              {!user && (
                <form
                  onSubmit={handleSubmit}
                  className="bg-gray-100 p-6 rounded-xl shadow-md mt-4"
                >
                  <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                      <label htmlFor="Email" className="sr-only">
                        Email
                      </label>
                      <input
                        id="Email"
                        name="Email"
                        type="email"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                        placeholder="Adresse email"
                        value={formData.Email}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="MotDePasse" className="sr-only">
                        Mot de passe
                      </label>
                      <input
                        id="MotDePasse"
                        name="MotDePasse"
                        type="password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                        placeholder="Mot de passe"
                        value={formData.MotDePasse}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      {loading ? "Connexion en cours..." : "Se connecter"}
                    </button>
                  </div>
                </form>
              )}
              {!user && (
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Pas encore de compte ?{" "}
                    <Link
                      href="/inscription"
                      className="font-medium text-green-600 hover:text-green-500"
                    >
                      Créer un compte
                    </Link>
                  </p>
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
