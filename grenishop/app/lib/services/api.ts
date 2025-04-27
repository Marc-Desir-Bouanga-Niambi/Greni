const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5240";

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
      const response = await fetch(`${API_URL}/api/Produits`, {
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
      console.error("Erreur lors de la récupération des produits:", error);
      throw new Error(
        "Impossible de se connecter au serveur. Vérifiez que le backend est en cours d'exécution."
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
