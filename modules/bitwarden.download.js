const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { dialog } = require('electron');

async function downloadBitwarden(userId, softwareId) {
  try {
    // Requête pour obtenir le lien de téléchargement Bitwarden depuis l'API Gateway
    const response = await axios.get('http://localhost:3000/bitwarden/download');
    console.log('API Gateway Response:', response.data);

    // Lien de téléchargement récupéré de l'API Gateway
    const downloadUrl = response.data.downloadUrl;

    // Demander à l'utilisateur où sauvegarder le fichier
    const savePath = dialog.showSaveDialogSync({
      title: 'Save Bitwarden',
      defaultPath: path.join(__dirname, 'Bitwarden.exe')
    });

    if (!savePath) {
      throw new Error('Download cancelled by user');
    }

    console.log('Download URL:', downloadUrl);

    // Télécharger le logiciel en utilisant le lien de téléchargement
    const downloadResponse = await axios({
      url: downloadUrl,
      method: 'GET',
      responseType: 'arraybuffer'
    });

    console.log('Download response status:', downloadResponse.status);
    
    // Sauvegarder le logiciel téléchargé localement
    fs.writeFileSync(savePath, downloadResponse.data);
    console.log('File saved successfully at:', savePath);

    // Envoyer une requête POST pour enregistrer le téléchargement
    const downloadData = {
      userId: userId,
      toolId: softwareId,
      downloadDate: new Date().toISOString(),
    };

    const postResponse = await axios.post('http://localhost:3000/downloads', downloadData);
    console.log('Post response status:', postResponse.status);

    console.log('Téléchargement et enregistrement réussis.');
  } catch (error) {
    console.error('Erreur lors du téléchargement ou de l\'enregistrement:', error);
  }
}

module.exports = downloadBitwarden;
