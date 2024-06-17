const axios = require('axios');
const config = require('../../config');
const fs = require('fs');
const path = require('path');
const { dialog } = require('electron');
const os = require('os');
const { exec } = require('child_process');

// Function that returns the path to the download directory within the user os
// This function is to be called within the savePath function
const getDefaultDownloadPath = () => {
  const homeDir = os.homedir();
  const downloadsDir = 'Downloads'; 

  return path.join(homeDir, downloadsDir);
}

async function downloadBitwarden(user_id) {
  try {
    // Requête pour obtenir le lien de téléchargement Bitwarden depuis l'API Gateway
    const response = await axios.get('http://localhost:3000/bitwarden/securityTools');
    console.log('API Gateway Response:', response.data);

    // Lien de téléchargement récupéré de l'API Gateway
    const downloadUrl = response.data.downloadUrl;

    // ID de l'outil de sécurité pour enregistrer le téléchargement
    const security_tool_id = response.data.security_tool_id;

    // Demander à l'utilisateur où sauvegarder le fichier
    // Utilisation du module dialog permettant d'afficher des boites de dialogue natives
    // Appel de la méthode showSaveDialogSync pour afficher une boîte de dialogue de sauvegarde
    const savePath = dialog.showSaveDialogSync({
      title: 'Save Bitwarden', // Titre de la boîte de dialogue
      defaultPath: path.join(getDefaultDownloadPath(), 'Bitwarden.exe') // Chemin par défaut pour enregistrer le fichier
    });

    if (!savePath) {
      throw new Error('Download cancelled by user');
    }

    console.log('Download URL:', downloadUrl);

    // Télécharger le logiciel en utilisant le lien de téléchargement
    /* Utilisation d'options de la requête GET: arraybuffer est utilisé pour les données binaires,
    ce qui est essentiel pour le téléchargement des fichiers.*/
    const downloadResponse = await axios({
      url: downloadUrl,
      method: 'GET',
      responseType: 'arraybuffer'
    });

    console.log('Download response status:', downloadResponse.status);
    
    // Sauvegarder le logiciel téléchargé localement
    fs.writeFileSync(savePath, downloadResponse.data);
    console.log('File saved successfully at:', savePath);

    // Lancer l'installation du logiciel téléchargé
    exec(`${savePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erreur lors de l'exécution de ${savePath} :`, error);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });

    // Envoyer une requête POST pour enregistrer le téléchargement
    const downloadData = {
      user_id: '665dc34ade6d37330168a834',
      security_tool_id: security_tool_id,
      download_date: new Date(),
      status: true,
    };

    const postResponse = await axios.post(`${config.api.url}/downloadHistory`, downloadData);
    console.log('Post response status:', postResponse.status);

    console.log('Téléchargement et enregistrement réussis.');
  } catch (error) {
    console.error('Erreur lors du téléchargement ou de l\'enregistrement:', error);
  }
}

module.exports = downloadBitwarden;

/* Résumé des étapes:
1. Requête pour obtenir le lien de téléchargement: requête GET à l'API Gateway pour obtenir l'URL de
téléchargement du logiciel.
2. Affichage de la boîte de dialogue de sauvegarde: permet à l'utilisateur de choisir où sauvegarder
le fichier téléchargé (le chemin par défaut proposé est celui du dossier téléchargements)
3. Téléchargement du logiciel: utilisation d'axios pour télécharger le fichier en tant que données binaires.
4. Sauvegarde du fichier: écriture des données téléchargées dans le fichier localement.
5. Enregistrement du téléchargement dans la base de données: requête POST à l'API Gateway pour envoyer les
données de téléchargement à la base de données (table downloadHistory).
*/