const axios = require('axios');
const config = require('../../config');
const fs = require('fs');
const path = require('path');


// Gestionnaire d'événement IPC pour soumettre le formulaire
const loginSubmitForm = async (_, loginValues) => {
  try {
    const response = await axios.post(`${config.api.url}/session/login`, loginValues);

    if (response.data.success) {
      const userData = {
        user: response.data.user,
        token: response.data.token
      };

      user = userData;

      const json = JSON.stringify(userData);

      fs.writeFile(path.join(__dirname, '../jsonfiles', 'userSession.json'), json, 'utf8', (error) => {
        if (error) {
          console.error('Erreur lors de l\'écriture du fichier :', error);
          throw error;
        }
        console.log('Les données de session ont été enregistrées avec succès.');
      });
    } 

    return response.data;
    // Transmettez l'ID de l'utilisateur à la fonction getUserData
    ipcRenderer.send('load-user-home', user._id);
  } catch (error) {
    console.log('Erreur lors de la soumission du formulaire :', error);
    
    if (error.response && error.response.status === 401) {
      return { success: false, error: 'Invalid email or password.' };
    }
    
    return { success: false, error: 'An error occurred during login. Please try again.' };
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