const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5240";

// Types
export interface Marque {
  id_marque: number;
  Nom: string;
}

export interface Modele {
  id_modele: number;
  nom_modele: string;
  nbr_neuf: number;
  nbr_occasion: number;
  prix_neuf: number;
  prix_occasion: number;
  Tag?: string;
  id_marque: number;
  Marque?: Marque;
}

export interface Produit {
  id_produit: number;
  Nom: string;
  Etat: string;
  id_commande?: number;
  id_modele: number;
  Modele?: Modele;
}

// Configuration des requêtes
const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

// Fonction utilitaire pour gérer les erreurs
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erreur HTTP:", response.status, response.statusText);
    console.error("Détails de l'erreur:", errorText);
    throw new Error(
      `Erreur HTTP: ${response.status} - ${response.statusText} - ${errorText}`
    );
  }
  return response.json();
};

// Services pour les marques
export const marqueService = {
  getAll: async (): Promise<Marque[]> => {
    try {
      const url = `${API_URL}/api/Marques`;
      console.log("URL de l'API:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: defaultHeaders,
      });

      console.log("Statut de la réponse:", response.status);
      return handleResponse(response);
    } catch (error) {
      console.error("Erreur détaillée:", error);
      throw new Error(
        `Impossible de se connecter au serveur: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`
      );
    }
  },

  getById: async (id: number): Promise<Marque> => {
    try {
      const url = `${API_URL}/api/Marques/${id}`;
      console.log("URL de l'API:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: defaultHeaders,
      });

      return handleResponse(response);
    } catch (error) {
      console.error("Erreur lors de la récupération de la marque:", error);
      throw new Error(
        `Impossible de récupérer la marque: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`
      );
    }
  },

  create: async (marque: Omit<Marque, "id_marque">): Promise<Marque> => {
    try {
      const url = `${API_URL}/api/Marques`;
      const response = await fetch(url, {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify(marque),
      });
      return handleResponse(response);
    } catch (error) {
      console.error("Erreur lors de la création de la marque:", error);
      throw error;
    }
  },

  update: async (id: number, marque: Marque): Promise<void> => {
    try {
      const url = `${API_URL}/api/Marques/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: defaultHeaders,
        body: JSON.stringify(marque),
      });
      await handleResponse(response);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la marque:", error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const url = `${API_URL}/api/Marques/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: defaultHeaders,
      });
      await handleResponse(response);
    } catch (error) {
      console.error("Erreur lors de la suppression de la marque:", error);
      throw error;
    }
  },
};

// Services pour les modèles
export const modeleService = {
  getAll: async (): Promise<Modele[]> => {
    try {
      const url = `${API_URL}/api/Modeles`;
      const response = await fetch(url, {
        method: "GET",
        headers: defaultHeaders,
      });
      return handleResponse(response);
    } catch (error) {
      console.error("Erreur lors de la récupération des modèles:", error);
      throw error;
    }
  },

  getById: async (id: number): Promise<Modele> => {
    try {
      const url = `${API_URL}/api/Modeles/${id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: defaultHeaders,
      });
      return handleResponse(response);
    } catch (error) {
      console.error("Erreur lors de la récupération du modèle:", error);
      throw error;
    }
  },

  create: async (modele: Omit<Modele, "id_modele">): Promise<Modele> => {
    try {
      const url = `${API_URL}/api/Modeles`;
      const response = await fetch(url, {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify(modele),
      });
      return handleResponse(response);
    } catch (error) {
      console.error("Erreur lors de la création du modèle:", error);
      throw error;
    }
  },

  update: async (id: number, modele: Modele): Promise<void> => {
    try {
      const url = `${API_URL}/api/Modeles/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: defaultHeaders,
        body: JSON.stringify(modele),
      });
      await handleResponse(response);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du modèle:", error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const url = `${API_URL}/api/Modeles/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: defaultHeaders,
      });
      await handleResponse(response);
    } catch (error) {
      console.error("Erreur lors de la suppression du modèle:", error);
      throw error;
    }
  },
};

// Services pour les produits
export const produitService = {
  getAll: async (): Promise<Produit[]> => {
    const response = await fetch(`${API_URL}/api/Produit`, {
      method: "GET",
      headers: defaultHeaders,
    });
    return handleResponse(response);
  },

  getById: async (id: number): Promise<Produit> => {
    try {
      const url = `${API_URL}/api/Produits/${id}`;
      console.log("URL de l'API:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: defaultHeaders,
      });

      return handleResponse(response);
    } catch (error) {
      console.error("Erreur lors de la récupération du produit:", error);
      throw new Error(
        `Impossible de récupérer le produit: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`
      );
    }
  },

  create: async (produit: Omit<Produit, "id_produit">): Promise<Produit> => {
    try {
      const url = `${API_URL}/api/Produits`;
      const response = await fetch(url, {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify(produit),
      });
      return handleResponse(response);
    } catch (error) {
      console.error("Erreur lors de la création du produit:", error);
      throw error;
    }
  },

  update: async (id: number, produit: Produit): Promise<void> => {
    try {
      const url = `${API_URL}/api/Produits/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: defaultHeaders,
        body: JSON.stringify(produit),
      });
      await handleResponse(response);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit:", error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const url = `${API_URL}/api/Produits/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: defaultHeaders,
      });
      await handleResponse(response);
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
      throw error;
    }
  },
};
