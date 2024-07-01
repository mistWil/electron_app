// Attendre que le DOM soit complètement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', async () => {
    // Écouter l'événement 'user-id' envoyé par le processus principal
    console.log('DOM fully loaded and parsed');

        try {
            // Demander les données de l'utilisateur
            const userData = await sendIpcRequest('get-user-data');
            console.log('User data received:', userData);

            // Afficher le nom de l'utilisateur
            // document.getElementById('user-name').textContent = `${userData.firstname} ${userData.lastname}`;
            const userNameElement = document.getElementById('user-name');
            console.log('User name element:', userNameElement);
            userNameElement.textContent = `${userData.firstname} ${userData.lastname}`;

            // Récupérer l'élément qui contiendra la grille des outils
            const toolsGrid = document.getElementById('security-tools-grid');
            console.log('Tools grid element:', toolsGrid);

            // Vérifier si l'utilisateur a téléchargé des outils
            if (userData.downloadHistory && userData.downloadHistory.length > 0) {
                console.log('User has downloaded tools:', userData.downloadHistory);
                // Parcourir l'historique des téléchargements et créer un élément pour chaque outil
                userData.downloadHistory.forEach(download => {
                    console.log('Processing download:', download);
                    const toolDiv = document.createElement('div');
                    toolDiv.className = 'security-tool-item';
                    // Créer une fonction dynamique pour charger le tutoriel
                    const loadTutorialFunction = `load${download.security_tool_id.name.replace(/\s+/g, '')}Tutos()`;

                    toolDiv.innerHTML = `
                        <h3>${download.security_tool_id.name}</h3>
                        <p><u>Description</u>: ${download.security_tool_id.description}</p>
                        <p><u>Version</u>: ${download.security_tool_id.version}</p>
                        <p><u>Téléchargé le</u>: ${new Date(download.download_date).toLocaleDateString()}</p>
                        <div class="card mb-4">
                            <a class="card-body" href="#" onclick="${loadTutorialFunction}">Guide d'utilisation</a>
                        </div>
                        <div class="card">
                            <a class="card-body" href="#" onclick="deleteTool('${download.security_tool_id._id}')">Supprimer</a>
                        </div>
                    `;
                    toolsGrid.appendChild(toolDiv);
                });
            } else {
                console.log('No tools downloaded');
                // Afficher un message si aucun outil n'a été téléchargé
                toolsGrid.innerHTML = '<p>Aucun outil téléchargé pour le moment.</p>';
            }
        } catch (error) {
            // Gérer les erreurs lors du chargement des données
            console.error('Error loading user data:', error);
            document.getElementById('security-tools-grid').innerHTML = '<p>Erreur lors du chargement des données utilisateur.</p>';
        }

     // Écouter les messages IPC du processus principal pour les mises à jour de l'état des logiciels
    ipcRenderer.on('software-status-updated', (event, data) => {
        console.log('Received software status update:', data);
        const { softwareName, status } = data;
        if (status === 'uninstalled') {
            const toolDiv = document.querySelector(`[data-software-name="${softwareName}"]`);
            if (toolDiv) {
                toolDiv.remove();
                console.log(`Removed ${softwareName} from the UI.`);
            }
        }
    });
});