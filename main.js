// Importation des modules nécessaires
const { app, BrowserWindow, ipcMain } = require('electron');
const ejse = require('ejs-electron');
const downloadBitwarden = require('./modules/bitwarden.download.js');

const isDev = process.env.NODE_ENV !== 'development'; // Vérifie si l'application n'est pas en mode développement
const isMac = process.platform === 'darwin'; // Vérifie si l'application est exécutée sur macOS

// Gestionnaire d'événement pour la communication entre les processus principal et de rendu
ipcMain.on('hello-world', function(event, arg) {
  console.log(arg); //downloadBitwarden Affiche l'argument reçu dans la console

  event.reply('hello-world', 'Hello from main process'); // Envoie une réponse au processus de rendu
});

ipcMain.handle('download-software', async (event, userId, softwareId) => {
  try {
    await downloadBitwarden(userId, softwareId);
    return 'Download and registration successful';
  } catch (error) {
    console.error('Error during download or registration:', error);
    throw error; // propagate the error to the renderer process
  }
});

// ipcMain.handle('dark-mode:system', () => {
//   nativeTheme.themeSource = 'system'
// });

// Fonction pour créer une nouvelle fenêtre
const createWindow = () => {
  const win = new BrowserWindow({
    width: isDev ? 1000 : 800, // Largeur de la fenêtre
    height: 600, // Hauteur de la fenêtre
    webPreferences: {
      nodeIntegration: true, // Intégration de Node.js activée
      contextIsolation: false, // Isolation du contexte désactivée (pour des raisons de compatibilité)
    },
    frame: true // Affiche le cadre de la fenêtre
  });

  // Open devtools if in dev environment
  if (isDev) {
    win.webContents.openDevTools();
  }

  // Charge le fichier HTML principal
  win.loadFile('./renderer/views/bitwarden.ejs');
};

// Événement déclenché lorsque l'application est prête
app.whenReady().then(() => {
  createWindow(); // Crée la fenêtre principale
});

// Autres événements et fonctions peuvent être ajoutés ici

app.on('window-all-closed', () => { // Événement déclenché lorsque toutes les fenêtres sont fermées
  if (!isMac) {
    app.quit();
  }
});