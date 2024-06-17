const axios = require('axios');
const config = require('../../config');


// Gestionnaire d'événement IPC pour soumettre le formulaire
const loginSubmitForm = async (_,loginValues) => {
  try {
    const response = await axios.post(`${config.api.url}/session/login`, loginValues);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire :', error);
    throw error;
  }
};

// const handleGetDownloadUrl = async () => {
//   try {
//     const response = await axios.get(`${config.api.url}/download`);
//     return response.data.downloadUrl;
//   } catch (error) {
//     console.error('Erreur lors de l\'obtention de l\'URL de téléchargement :', error);
//     throw error;
//   }
// };

module.exports = loginSubmitForm;