import React, { useState, useEffect } from "react";
import EtudiantModal from "./components/EtudiantModal";
import EtudiantCard from "./components/EtudiantCard";
import { etudiantService } from "./services/EtudiantService";
import "./styles/App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
function App() {
  const [etudiants, setEtudiants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEtudiant, setEditingEtudiant] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadEtudiants();
  }, []);
  const loadEtudiants = async () => {
    setLoading(true);
    try {
      const data = await etudiantService.getAllEtudiants();
      setEtudiants(data);
    } catch (error) {
      console.error("Error loading etudiants:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCreateEtudiant = async (etudiantData) => {
  try {
    //Conversion des clés camelCase vers snake_case
    const payload = {
      num_carte: etudiantData.numCarte,
      nom: etudiantData.nom,
      prenom: etudiantData.prenom,
      email: etudiantData.email,
      telephone: etudiantData.telephone,
      avatar: etudiantData.avatar
    };

    console.log("Données envoyées au backend :", payload);
    await etudiantService.createEtudiant(payload);
    await loadEtudiants();
    setIsModalOpen(false);
  } catch (error) {
    console.error("Error creating etudiant:", error);
  }
};

  const handleUpdateEtudiant = async (etudiantData) => {
    try {
      await etudiantService.updateEtudiant(etudiantData.id, etudiantData);
      await loadEtudiants();
      setIsModalOpen(false);
      setEditingEtudiant(null);
    } catch (error) {
      console.error("Error updating etudiant:", error);
    }
  };
  const handleDeleteEtudiant = async (id) => {
    try {
      await etudiantService.deleteEtudiant(id);
      await loadEtudiants();
    } catch (error) {
      console.error("Error deleting etudiant:", error);
    }
  };
  const openCreateModal = () => {
    setEditingEtudiant(null);
    setIsModalOpen(true);
  };
  const openEditModal = (etudiant) => {
    setEditingEtudiant(etudiant);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEtudiant(null);
  };
  const filteredEtudiants = etudiants.filter((e) => {
    const term = searchTerm.toLowerCase();
    const fullName = `${e.nom} ${e.prenom}`.toLowerCase();
    const email = e.email?.toLowerCase() || "";
    const numCarte = e.num_carte?.toLowerCase() || "";
    return (
      fullName.includes(term) || email.includes(term) || numCarte.includes(term)
    );
  });
  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">
            <i className="fas fa-user-graduate"></i> Gestion des Étudiants
          </h1>
          <p className="app-subtitle">Application CRUD moderne et responsive</p>
        </header>
        <div className="controls">
          <div className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Rechercher un étudiant ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="btn btn-primary" onClick={openCreateModal}>
            <i className="fas fa-plus"></i> Nouvel Étudiant
          </button>
        </div>
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Chargement des étudiants ...</p>
          </div>
        )}
        <div className="etudiants-grid">
          {filteredEtudiants.map((etudiant) => (
            <EtudiantCard
              key={etudiant.id}
              etudiant={etudiant}
              onEdit={openEditModal}
              onDelete={handleDeleteEtudiant}
            />
          ))}
        </div>
        {!loading && filteredEtudiants.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-user-slash"></i>
            <h3>Aucun utilisateur trouvé</h3>
            <p>
              {searchTerm
                ? "Aucun étudiant ne correspond à votre recherche"
                : "Commencez par ajouter un nouvel étudiant"}
            </p>
          </div>
        )}
        {isModalOpen && (
          <EtudiantModal
            etudiant={editingEtudiant}
            onSave={
              editingEtudiant ? handleUpdateEtudiant : handleCreateEtudiant
            }
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
}
export default App;