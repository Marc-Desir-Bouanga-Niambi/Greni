const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5240";

// Types
export interface Compte {
  id_compte: number;
  Nom: string;
  Prenom: string;
  Email: string;
  date_inscription: string;
}

export interface InscriptionData {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
}

export interface InscriptionResponse {
  message: string;
  success?: boolean;
  errors?: string[];
}

export interface ConnexionData {
  Email: string;
  MotDePasse: string;
}

// Configuration des requêtes
const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

// Fonction utilitaire pour gérer les erreurs
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    let errorMessage = `Erreur HTTP: ${response.status} - ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData && typeof errorData === "object") {
        errorMessage =
          errorData.message || errorData.error || JSON.stringify(errorData);
      }
    } catch (e) {
      console.error("Erreur lors de la lecture de la réponse:", e);
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

// Service d'authentification
export const authService = {
  // Inscription
  inscription: async (data: InscriptionData): Promise<InscriptionResponse> => {
    try {
      console.log("Tentative d'inscription avec les données:", data);

      const response = await fetch(`${API_URL}/api/Comptes/inscription`, {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify(data),
      });

      console.log("Statut de la réponse:", response.status);
      return handleResponse(response);
    } catch (error) {
      console.error("Erreur détaillée:", error);
      throw error;
    }
  },

  // Connexion
  connexion: async (
    data: ConnexionData
  ): Promise<{ message: string; compte: Compte }> => {
    try {
      console.log("Tentative de connexion avec les données:", data);

      const response = await fetch(`${API_URL}/api/Comptes/connexion`, {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify(data),
      });

      console.log("Statut de la réponse:", response.status);
      return handleResponse(response);
    } catch (error) {
      console.error("Erreur détaillée:", error);
      throw error;
    }
  },
};
