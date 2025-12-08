import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, 
  faSave, 
  faRandom, 
  faIdCard, 
  faUser, 
  faUserTag, 
  faEnvelope, 
  faPhone, 
  faImage 
} from '@fortawesome/free-solid-svg-icons';

const EtudiantModal = ({ etudiant, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    numCarte: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    avatar: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (etudiant) {
      setFormData({
        numCarte: etudiant.num_carte || '',
        nom: etudiant.nom || '',
        prenom: etudiant.prenom || '',
        email: etudiant.email || '',
        telephone: etudiant.telephone || '',
        avatar: etudiant.avatar || ''
      });
    }
  }, [etudiant]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.numCarte.trim()) newErrors.numCarte = 'Le numéro de carte est requis';
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email est invalide';
    }
    if (!formData.telephone.trim()) newErrors.telephone = 'Le téléphone est requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSave(etudiant ? {...formData, id: etudiant.id} : formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const generateAvatar = () => {
    const randomAvatar = `https://i.pravatar.cc/150?u=${Math.random()}`;
    setFormData(prev => ({ ...prev, avatar: randomAvatar }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <FontAwesomeIcon icon={etudiant ? faUserTag : faUser} style={{marginRight: '10px'}} />
            {etudiant ? 'Modifier l\'étudiant' : 'Nouvel étudiant'}
          </h2>
          <button className="close-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Numéro de carte avec icône */}
          <div className="form-group">
            <label htmlFor="numCarte">
              <FontAwesomeIcon icon={faIdCard} style={{marginRight: '8px'}} />
              Numéro de carte *
            </label>
            <input
              type="text"
              id="numCarte"
              name="numCarte"
              value={formData.num_carte}
              onChange={handleChange}
              className={errors.num_carte ? 'error' : ''}
              placeholder="Entrez le numéro de carte"
            />
            {errors.numCarte && <span className="error-message">{errors.numCarte}</span>}
          </div>

          {/* Nom avec icône */}
          <div className="form-group">
            <label htmlFor="nom">
              <FontAwesomeIcon icon={faUser} style={{marginRight: '8px'}} />
              Nom *
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className={errors.nom ? 'error' : ''}
              placeholder="Entrez le nom"
            />
            {errors.nom && <span className="error-message">{errors.nom}</span>}
          </div>

          {/* Prénom avec icône */}
          <div className="form-group">
            <label htmlFor="prenom">
              <FontAwesomeIcon icon={faUserTag} style={{marginRight: '8px'}} />
              Prénom *
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className={errors.prenom ? 'error' : ''}
              placeholder="Entrez le prénom"
            />
            {errors.prenom && <span className="error-message">{errors.prenom}</span>}
          </div>

          {/* Email avec icône */}
          <div className="form-group">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} style={{marginRight: '8px'}} />
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Entrez l'email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Téléphone avec icône */}
          <div className="form-group">
            <label htmlFor="telephone">
              <FontAwesomeIcon icon={faPhone} style={{marginRight: '8px'}} />
              Téléphone *
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className={errors.telephone ? 'error' : ''}
              placeholder="Entrez le téléphone"
            />
            {errors.telephone && <span className="error-message">{errors.telephone}</span>}
          </div>

          {/* Avatar avec icône */}
          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faImage} style={{marginRight: '8px'}} />
              Avatar
            </label>
            <div className="avatar-section">
              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="URL de l'avatar"
              />
              <button type="button" className="btn btn-secondary" onClick={generateAvatar}>
                <FontAwesomeIcon icon={faRandom} style={{marginRight: '5px'}} />
                Générer
              </button>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              <FontAwesomeIcon icon={faSave} style={{marginRight: '5px'}} />
              {etudiant ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EtudiantModal;