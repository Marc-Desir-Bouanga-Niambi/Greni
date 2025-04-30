import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
console.log("URL de l'API:", API_URL);

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

export interface AuthResponse {
  message: string;
  token: string;
  compte: Compte;
}

// Configuration d'axios pour inclure le token dans toutes les requêtes
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Configuration de la requête:", {
    url: config.url,
    method: config.method,
    headers: config.headers,
  });
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function login(
  email: string,
  motDePasse: string
): Promise<Compte> {
  try {
    console.log("Tentative de connexion avec:", { email });
    const response = await api.post<any>("/api/Comptes/connexion", {
      Email: email,
      MotDePasse: motDePasse,
    });
    console.log("Réponse complète de connexion:", response);
    console.log("Données du compte:", response.data.compte);

    if (!response.data.compte) {
      throw new Error("Aucune donnée de compte reçue du serveur");
    }

    // Transformation des données pour correspondre à l'interface Compte
    const compte: Compte = {
      id_compte: response.data.compte.id_compte,
      Nom: response.data.compte.nom || response.data.compte.Nom,
      Prenom: response.data.compte.prenom || response.data.compte.Prenom,
      Email: response.data.compte.email || response.data.compte.Email,
      date_inscription: response.data.compte.date_inscription,
    };

    console.log("Données transformées:", compte);
    localStorage.setItem("token", response.data.token);
    return compte;
  } catch (error: any) {
    console.error("Erreur détaillée de connexion:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw new Error(error.response?.data?.message || "Échec de connexion");
  }
}

export async function getProfil(): Promise<Compte> {
  try {
    console.log("Tentative de récupération du profil...");
    const token = localStorage.getItem("token");
    console.log("Token présent:", !!token);
    console.log("URL de l'API:", API_URL);

    const response = await api.get<any>("/api/Comptes/profil");
    console.log("Réponse complète:", response);
    console.log("Données du profil:", response.data);

    if (!response.data) {
      throw new Error("Aucune donnée reçue du serveur");
    }

    // Transformation des données pour correspondre à l'interface Compte
    const compte: Compte = {
      id_compte: response.data.id_compte,
      Nom: response.data.nom || response.data.Nom,
      Prenom: response.data.prenom || response.data.Prenom,
      Email: response.data.email || response.data.Email,
      date_inscription: response.data.date_inscription,
    };

    console.log("Données transformées:", compte);
    return compte;
  } catch (error: any) {
    console.error("Erreur détaillée:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    });
    throw new Error("Erreur lors de la récupération du profil");
  }
}

export async function inscription(
  data: InscriptionData
): Promise<InscriptionResponse> {
  try {
    // Vérification des données
    if (!data.nom || !data.prenom || !data.email || !data.motDePasse) {
      throw new Error("Tous les champs sont obligatoires");
    }

    // Transformation des données pour correspondre à l'API
    const apiData = {
      Nom: data.nom.trim(),
      Prenom: data.prenom.trim(),
      Email: data.email.trim(),
      MotDePasse: data.motDePasse,
    };

    console.log("Tentative d'inscription avec:", apiData);
    const response = await api.post<InscriptionResponse>(
      "/api/Comptes/inscription",
      apiData
    );
    console.log("Réponse d'inscription:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Erreur d'inscription:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw new Error(
      error.response?.data?.message || "Erreur lors de l'inscription"
    );
  }
}

export function logout(): void {
  localStorage.removeItem("token");
}

export default api;
