// Service pour gérer les étudiants via l'API backend
class EtudiantService {
  constructor() {
    this.apiUrl = "http://localhost:8000/api/etudiants/";
  }
  // Récupérer tous les étudiants
  async getAllEtudiants() {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des étudiants");
    }
    return await response.json();
  }
  // Créer un nouvel étudiant
  async createEtudiant(etudiantData) {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(etudiantData),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la création de l'étudiant");
    }
    return await response.json();
  }
  // Mettre à jour un étudiant
  async updateEtudiant(id, etudiantData) {
    const response = await fetch(`${this.apiUrl}${id}/`, {
      method: "PUT", // ou PATCH selon votre API
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(etudiantData),
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour de l'étudiant");
    }
    return await response.json();
  }
  // Supprimer un étudiant
  async deleteEtudiant(id) {
    const response = await fetch(`${this.apiUrl}${id}/`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de l'étudiant");
    }
    return true;
  }
}
export const etudiantService = new EtudiantService();