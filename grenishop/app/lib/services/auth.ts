import axios from "axios";

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

export interface AuthResponse {
  message: string;
  token: string;
  compte: Compte;
}

// Configuration d'axios pour inclure le token dans toutes les requêtes
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
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
    const response = await api.post<AuthResponse>("/api/Comptes/connexion", {
      Email: email,
      MotDePasse: motDePasse,
    });
    console.log("Réponse de connexion:", response.data);
    localStorage.setItem("token", response.data.token);
    return response.data.compte;
  } catch (error: any) {
    console.error(
      "Erreur de connexion:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Échec de connexion");
  }
}

export async function getProfil(): Promise<Compte> {
  try {
    const response = await api.get<Compte>("/api/Comptes/profil");
    return response.data;
  } catch (error) {
    console.error("Erreur de récupération du profil:", error);
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
