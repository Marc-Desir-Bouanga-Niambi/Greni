"use client";

<<<<<<< Updated upstream
<<<<<<< Updated upstream
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authService, InscriptionData } from "../lib/services/auth";

export default function Inscription() {
=======
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Inscription() {
=======
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Inscription() {
>>>>>>> Stashed changes
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  const router = useRouter();
  const [formData, setFormData] = useState<InscriptionData>({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    setError("");
    setLoading(true);

    try {
      const response = await authService.inscription(formData);
      if (response.success) {
        router.push("/connexion");
      }
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.join("\n"));
      } else {
        setError(
          err.message || "Une erreur est survenue lors de l'inscription"
        );
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Créer un compte
          </h2>
        </div>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
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
                <p className="text-sm text-red-700 whitespace-pre-line">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="nom" className="sr-only">
=======
    try {
      const response = await fetch(
        "https://grenishop-agdfdkhbcpf8erfv.francecentral-01.azurewebsites.net",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: nom,
            prenom: prenom,
            email: email,
            motDePasse: motDePasse,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Redirection vers la page de connexion
        router.push("/connexion");
      } else {
        // Gérer l'erreur
        console.error(data.message);
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
=======
    try {
      const response = await fetch(
        "https://grenishop-agdfdkhbcpf8erfv.francecentral-01.azurewebsites.net",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: nom,
            prenom: prenom,
            email: email,
            motDePasse: motDePasse,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Redirection vers la page de connexion
        router.push("/connexion");
      } else {
        // Gérer l'erreur
        console.error(data.message);
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
>>>>>>> Stashed changes
  };

  return (
    <>
      <head>
        <title>Inscription</title>
      </head>

      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Créer un compte
          </h2>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="nom"
                className="block text-sm font-medium text-gray-700"
              >
<<<<<<< Updated upstream
>>>>>>> Stashed changes
                Nom
=======
                Nom
              </label>
              <input
                id="nom"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="prenom"
                className="block text-sm font-medium text-gray-700"
              >
                Prénom
              </label>
              <input
                id="prenom"
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
>>>>>>> Stashed changes
              </label>
              <input
                id="nom"
<<<<<<< Updated upstream
                name="nom"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Nom"
                value={formData.nom}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="prenom" className="sr-only">
=======
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
<<<<<<< Updated upstream
                htmlFor="prenom"
                className="block text-sm font-medium text-gray-700"
              >
>>>>>>> Stashed changes
                Prénom
              </label>
              <input
                id="prenom"
<<<<<<< Updated upstream
                name="prenom"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Prénom"
                value={formData.prenom}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Adresse email
=======
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
>>>>>>> Stashed changes
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Adresse email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
<<<<<<< Updated upstream
            <div>
              <label htmlFor="motDePasse" className="sr-only">
=======

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
>>>>>>> Stashed changes
=======
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
>>>>>>> Stashed changes
                Mot de passe
              </label>
              <input
                id="motDePasse"
                name="motDePasse"
                type="password"
<<<<<<< Updated upstream
=======
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="********"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="********"
>>>>>>> Stashed changes
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
                value={formData.motDePasse}
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
              {loading ? "Inscription en cours..." : "S'inscrire"}
            </button>
<<<<<<< Updated upstream
=======
          </form>

          <div className="mt-4 text-center">
            <a
              href="/connexion"
              className="text-sm text-gray-600 hover:text-gray-500"
            >
              Déjà un compte ? Connectez-vous
            </a>
>>>>>>> Stashed changes
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Déjà un compte ?{" "}
            <Link
              href="/connexion"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
