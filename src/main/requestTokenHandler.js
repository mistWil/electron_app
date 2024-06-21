const fs = require('fs');
const path = require('path');
const axios = require('axios');
const config = require('../../config');

// Fonction pour envoyer une requête avec le jeton de session dans le header authorization

const sendRequestWithToken = async (url, method, data) => {
  try {
    // lire et récupérer les données de session à partir du fichier JSON
    const sessionData = JSON.parse(fs.readFileSync(path.join(__dirname, '../jsonfiles', 'userSession.json'), 'utf8'));
    const token = sessionData.token;

    // configurer les en-têtes avec le jeton d'authorisation récupéré
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // envoyer la requête avec les en-têtes configurés
    const response = await axios({
      url: `${config.api.url}${url}`,
      method: method,
      headers: headers,
      data: data,
    });

    return response.data;
  } catch (error) {
    console.log('Erreur lors de l\'envoi de la requête :', error);
    throw error;
  }
};

module.exports = sendRequestWithToken;