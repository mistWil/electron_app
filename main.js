const { app, BrowserWindow } = require('electron');
const path = require('path');
const ejs = require('ejs-electron');

ejs.data({
  title: "Protect Yourself" 
});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });


  win.loadFile(process.cwd() + '/renderer/views/index.ejs').then(() => {
    win.webContents.openDevTools(); // Ouvrir les outils de développement pour le débogage
  }).catch(err => {
    console.error('Erreur lors du chargement du fichier index.ejs :', err);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
