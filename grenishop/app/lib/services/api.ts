const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Types
export interface Entreprise {
  entrepriseID: number;
  nom_Entreprise: string;
}

export interface Produit {
  produitID: number;
  nom: string;
  etat: string;
  entrepriseID: number;
  nombre_Neuf: number;
  nombre_Occasion: number;
  prix_Neuf: number;
  prix_Occasion: number;
  entreprise?: Entreprise;
}

// Services pour les produits
export const produitService = {
  getAll: async (): Promise<Produit[]> => {
    try {
      console.log("Tentative de connexion à l'API:", `${API_URL}/api/Produits`);
      const response = await fetch(`${API_URL}/api/Produits`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "omit",
      });

      if (!response.ok) {
        console.error("Erreur HTTP:", response.status, response.statusText);
        throw new Error(
          `Erreur HTTP: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Données reçues:", data);
      return data;
    } catch (error) {
      console.error("Erreur détaillée:", error);
      throw new Error(
        `Impossible de se connecter au serveur: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`
      );
    }
  },

  getById: async (id: number): Promise<Produit> => {
    try {
      const response = await fetch(`${API_URL}/api/Produits/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error("Erreur lors de la récupération du produit:", error);
      throw new Error(
        "Impossible de se connecter au serveur. Vérifiez que le backend est en cours d'exécution."
      );
    }
  },
};
