export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5240";

// Types
export interface Marque {
  id_marque: number;
  Nom: string;
  Modeles?: Modele[];
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
  Produits?: Produit[];
  ListeDeSouhaits?: ListeDeSouhaits[];
}

export interface Produit {
  id_produit: number;
  nom_produit: string;
  Etat: string;
  nom_modele: string;
  prix_neuf: number;
  prix_occasion: number;
  nom_marque: string;
  id_modele: number;
}

export interface Commande {
  id_commande: number;
  date_commande: Date;
  date_reception?: Date;
  status_commande: string;
  adresse_livraison: string;
  id_compte: number;
  Compte?: Compte;
  Produits?: Produit[];
}

export interface Compte {
  id_compte: number;
  Nom: string;
  Prenom: string;
  Email: string;
  MotDePasse: string;
  Telephone?: string;
  Adresse?: string;
  Commandes?: Commande[];
  ListeDeSouhaits?: ListeDeSouhaits[];
}

export interface ListeDeSouhaits {
  id_liste: number;
  id_compte: number;
  id_modele: number;
  Compte?: Compte;
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
      const url = `${API_URL}/api/Modele`;
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
      const url = `${API_URL}/api/Modele/${id}`;
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
    const response = await fetch(`${API_URL}/api/Produit`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des produits");
    }
    return response.json();
  },

  getById: async (id: number): Promise<Produit> => {
    try {
      console.log(`Tentative de récupération du produit ${id}`);
      const url = `${API_URL}/api/Produit/${id}`;
      console.log(`URL de la requête: ${url}`);

      const response = await fetch(url, {
        method: "GET",
        headers: defaultHeaders,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Erreur HTTP: ${response.status} - ${response.statusText}`
        );
        console.error(`Détails de l'erreur: ${errorText}`);
        throw new Error(
          `Erreur lors de la récupération du produit: ${response.status} - ${errorText}`
        );
      }

      const produitBrut = await response.json();
      console.log(
        "Produit brut récupéré:",
        JSON.stringify(produitBrut, null, 2)
      );

      if (!produitBrut) {
        throw new Error("Produit non trouvé");
      }

      // Récupérer l'ID du modèle à partir du nom du modèle
      const modeles = await modeleService.getAll();
      const modele = modeles.find(
        (m) => m.nom_modele === produitBrut.nom_modele
      );

      if (!modele) {
        throw new Error(
          `Modèle non trouvé pour le produit: ${produitBrut.nom_modele}`
        );
      }

      // Normalisation des propriétés
      const produit: Produit = {
        id_produit: produitBrut.id_produit,
        nom_produit: produitBrut.nom_produit,
        Etat: produitBrut.Etat,
        id_modele: modele.id_modele,
        nom_modele: produitBrut.nom_modele,
        prix_neuf: produitBrut.prix_neuf,
        prix_occasion: produitBrut.prix_occasion,
        nom_marque: produitBrut.nom_marque,
      };

      console.log("Produit normalisé:", JSON.stringify(produit, null, 2));

      return produit;
    } catch (error) {
      console.error(
        "Erreur détaillée lors de la récupération du produit:",
        error
      );
      throw new Error(
        `Erreur lors de la récupération du produit: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`
      );
    }
  },

  getStock: async (id: number, etat: "Neuf" | "Occasion"): Promise<number> => {
    try {
      console.log(
        `Tentative de récupération du stock pour le produit ${id} (${etat})`
      );

      // Récupérer le produit
      const produit = await produitService.getById(id);
      console.log(
        `Structure complète du produit:`,
        JSON.stringify(produit, null, 2)
      );

      if (!produit.id_modele) {
        console.error("Structure du produit:", produit);
        throw new Error("ID du modèle non trouvé pour le produit");
      }

      // Récupérer le modèle
      const modele = await modeleService.getById(produit.id_modele);
      console.log(`Modèle récupéré:`, modele);

      // Retourner le stock approprié en fonction de l'état fourni en paramètre
      const stock = etat === "Neuf" ? modele.nbr_neuf : modele.nbr_occasion;
      console.log(`Stock calculé pour le produit ${id}: ${stock}`);

      return stock;
    } catch (error) {
      console.error(
        "Erreur détaillée lors de la récupération du stock:",
        error
      );
      throw new Error(
        `Erreur lors de la récupération du stock: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`
      );
    }
  },

  create: async (produit: Omit<Produit, "id_produit">): Promise<Produit> => {
    try {
      const url = `${API_URL}/api/Produit`;
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
      const url = `${API_URL}/api/Produit/${id}`;
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
      const url = `${API_URL}/api/Produit/${id}`;
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
