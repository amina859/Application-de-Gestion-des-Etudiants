import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEnvelope, faIdCard, faPhone } from '@fortawesome/free-solid-svg-icons';

const EtudiantCard = ({ etudiant, onEdit, onDelete }) => {
  return (
    <div className="etudiant-card">
      <div className="etudiant-card-header">
        <img 
          src={etudiant.avatar || `https://i.pravatar.cc/150?u=${etudiant.num_carte}`} 
          alt={`${etudiant.nom} ${etudiant.prenom}`}
          className="etudiant-avatar"
        />
        <div className="etudiant-info">
          <h3 className="etudiant-name">{etudiant.nom} {etudiant.prenom}</h3>
          
          {/* Email avec icône */}
          <div className="etudiant-detail">
            <FontAwesomeIcon icon={faEnvelope} />
            <span className="etudiant-email">{etudiant.email}</span>
          </div>
          
          {/* Carte avec icône */}
          <div className="etudiant-detail">
            <FontAwesomeIcon icon={faIdCard} />
            <span className="etudiant-numCarte">Carte: {etudiant.num_carte}</span>
          </div>
          
          {/* Téléphone avec icône */}
          <div className="etudiant-detail">
            <FontAwesomeIcon icon={faPhone} />
            <span className="etudiant-telephone">Téléphone: {etudiant.telephone}</span>
          </div>
        </div>
      </div>

      <div className="etudiant-card-actions">
        <button 
          className="btn-action btn-edit"
          onClick={() => onEdit(etudiant)}
          title="Modifier"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button 
          className="btn-action btn-delete"
          onClick={() => onDelete(etudiant.id)}
          title="Supprimer"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default EtudiantCard;