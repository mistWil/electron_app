// Importation des modules nécessaires
const { ipcRenderer } = require('electron');
const { sendIpcRequest } = require('../scripts/rendererUtils');

// Attendre que le DOM soit complètement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', async () => {
    // Écouter l'événement 'user-id' envoyé par le processus principal


        try {
            // Demander les données de l'utilisateur
            const userData = await sendIpcRequest('get-user-data');
            console.log('User data received:', userData);

            // Afficher le nom de l'utilisateur
            document.getElementById('user-name').textContent = `${userData.firstname} ${userData.lastname}`;

            // Récupérer l'élément qui contiendra la grille des outils
            const toolsGrid = document.getElementById('security-tools-grid');

            // Vérifier si l'utilisateur a téléchargé des outils
            if (userData.downloadHistory && userData.downloadHistory.length > 0) {
                // Parcourir l'historique des téléchargements et créer un élément pour chaque outil
                userData.downloadHistory.forEach(download => {
                    const toolDiv = document.createElement('div');
                    toolDiv.className = 'security-tool-item';
                    toolDiv.innerHTML = `
                        <h3>${download.security_tool_id.name}</h3>
                        <p>${download.security_tool_id.description}</p>
                        <p>Version: ${download.security_tool_id.version}</p>
                        <p>Téléchargé le: ${new Date(download.download_date).toLocaleDateString()}</p>
                    `;
                    toolsGrid.appendChild(toolDiv);
                });
            } else {
                // Afficher un message si aucun outil n'a été téléchargé
                toolsGrid.innerHTML = '<p>Aucun outil téléchargé pour le moment.</p>';
            }
        } catch (error) {
            // Gérer les erreurs lors du chargement des données
            console.error('Error loading user data:', error);
            document.getElementById('security-tools-grid').innerHTML = '<p>Erreur lors du chargement des données utilisateur.</p>';
        }
});