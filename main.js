const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const config = require('./config');
const { getAppPath, getRendererPath } = require('./src/main/mainUtils');
const handleSubmitForm = require('./src/main/submitRegister');
const downloadBitwarden = require('./src/main/bitwardenDownload');
const ejse = require('ejs-electron');


//Reloader
try {
    require('electron-reloader')(module);
} catch { }

// Fonction pour créer la fenêtre principale
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'src/preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  // Charger la page d'index HTML
    const indexPath = path.join(getRendererPath(), 'index.ejs');
  console.log('Chemin d\'accès au fichier index.html :', indexPath);
  win.loadFile(indexPath);
}

// Créer la fenêtre principale lorsque l'application est prête
app.whenReady().then(createWindow);

// Exposer les gestionnaires d'événements IPC
ipcMain.handle('get-bitwarden', downloadBitwarden);
ipcMain.handle('submit-form', handleSubmitForm);

// Gérer les événements de fermeture de fenêtre
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});