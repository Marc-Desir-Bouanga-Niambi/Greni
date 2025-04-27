"use client";

import { useEffect, useState } from "react";
import { produitService } from "../lib/services/api";

export default function TestConnection() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const testConnection = async () => {
      try {
        const products = await produitService.getAll();
        setStatus("success");
        setMessage(`Connexion réussie ! ${products.length} produits trouvés.`);
      } catch (error) {
        setStatus("error");
        setMessage(
          `Erreur de connexion : ${
            error instanceof Error ? error.message : "Erreur inconnue"
          }`
        );
      }
    };

    testConnection();
  }, []);

  return (
    <div
      className={`p-4 rounded-lg ${
        status === "loading"
          ? "bg-yellow-100"
          : status === "success"
          ? "bg-green-100"
          : "bg-red-100"
      }`}
    >
      <h2 className="text-lg font-semibold mb-2">
        {status === "loading"
          ? "Test de connexion..."
          : status === "success"
          ? "Connexion réussie"
          : "Erreur de connexion"}
      </h2>
      <p>{message}</p>
    </div>
  );
}
