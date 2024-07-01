// const { ipcRenderer } = require('electron');
// const { sendIpcRequest } = require('../scripts/rendererUtils');

// Attendre que le DOM soit complètement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded and parsed');

    try {
        // Demander les données de l'utilisateur
        const userData = await sendIpcRequest('get-user-data');
        console.log('User data received:', JSON.stringify(userData, null, 2));

        // Afficher le nom de l'utilisateur
        const userNameElement = document.getElementById('user-name');
        console.log('User name element:', userNameElement);
        if (userNameElement) {
            userNameElement.textContent = `${userData.firstname} ${userData.lastname}`;
        } else {
            console.warn('User name element not found');
        }

        // Récupérer l'élément qui contiendra la grille des outils
        const toolsGrid = document.getElementById('security-tools-grid');
        console.log('Tools grid element:', toolsGrid);

        if (toolsGrid) {
            // Vider le contenu existant de la grille
            toolsGrid.innerHTML = '';

            // Vérifier si l'utilisateur a téléchargé des outils
            if (userData.downloadHistory && userData.downloadHistory.length > 0) {
                console.log('Download history:', JSON.stringify(userData.downloadHistory, null, 2));
                
                // Parcourir l'historique des téléchargements et créer un élément pour chaque outil
                userData.downloadHistory.forEach(download => {
                    console.log('Processing download:', download);
                    if (download.security_tool_id) {
                        const toolDiv = document.createElement('div');
                        toolDiv.className = 'security-tool-item';
                        toolDiv.innerHTML = `
                            <h3>${download.security_tool_id.name || 'Nom inconnu'}</h3>
                            <p><u>Description</u>: ${download.security_tool_id.description || 'Pas de description'}</p>
                            <p><u>Version</u>: ${download.security_tool_id.version || 'Version inconnue'}</p>
                            <p><u>Téléchargé le</u>: ${new Date(download.download_date).toLocaleDateString()}</p>
                            <div class="card mb-4">
                                <a class="card-body" href="#" onclick="loadPrivazerTutos()">Guide d'utilisation</a>
                            </div>
                            <div class="card">
                                <a class="card-body" href="#" onclick="">Supprimer</a>
                            </div>
                        `;
                        toolsGrid.appendChild(toolDiv);
                    } else {
                        console.warn('Download entry missing security_tool_id:', download);
                    }
                });
            } else {
                console.log('No tools downloaded');
                // Afficher un message si aucun outil n'a été téléchargé
                toolsGrid.innerHTML = '<p>Aucun outil téléchargé pour le moment.</p>';
            }
        } else {
            console.error('Tools grid element not found');
        }
    } catch (error) {
        // Gérer les erreurs lors du chargement des données
        console.error('Error loading user data:', error);
        const errorElement = document.getElementById('security-tools-grid') || document.body;
        errorElement.innerHTML = '<p>Erreur lors du chargement des données utilisateur.</p>';
    }
});