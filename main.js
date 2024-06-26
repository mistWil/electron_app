const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const config = require('./config');
const { getAppPath, getRendererPath } = require('./src/main/mainUtils');
const handleSubmitForm = require('./src/main/submitRegister');
const downloadBitwarden = require('./src/main/bitwardenDownload');
const ejse = require('ejs-electron');
const loginSubmitForm = require('./src/main/submitLogin');
const nodemailer = require('nodemailer');
const getUserData = require('./src/main/getUserData'); // Importer la nouvelle fonction
const fs = require('fs');

// Reloader (pour le développement)
try {
  require('electron-reloader')(module);
} catch {}

// Vérifie si l'application n'est pas en mode développement
const isDev = process.env.NODE_ENV !== "development";

// Fenêtre principale
let mainWindow;

global.user = null;

// Fonction pour créer la fenêtre principale
function createWindow() {

  const data = fs.readFileSync('./src/jsonFiles/userSession.json')

  if (data)
  {
    user = JSON.parse(data);
  }
  console.log('Global user data loaded:', global.user);
  // console.log(user);


  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'src/preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  // Ouvrir les outils de développement si en mode développement
  // if (isDev) {
  //   mainWindow.webContents.openDevTools();
  // }

  // Charger la page d'index HTML
  const indexPath = path.join(getRendererPath(), 'index.ejs');
  console.log('Chemin d\'accès au fichier index.html :', indexPath);
  mainWindow.loadFile(indexPath);

  // Gérer les événements IPC
  ipcMain.handle('login-form', loginSubmitForm);
  ipcMain.handle('get-user-data', getUserData); 

  ipcMain.on('reload-login-page', () => {
    const loginPath = path.join(getRendererPath(), 'login.ejs');
    mainWindow.loadFile(loginPath);
  });

  ipcMain.on('load-tools-page', (event) => {
  const toolsPath = path.join(getRendererPath(), 'listOfTools.ejs');
  console.log('Chargement de la page des outils:', toolsPath);
  mainWindow.loadFile(toolsPath)
    .then(() => console.log('Page des outils chargée avec succès'))
    .catch(err => console.error('Erreur lors du chargement de la page des outils:', err));
});

  // Gestion du formulaire de contact
  const transporter = nodemailer.createTransport(config.email);

  ipcMain.on('submit-contact-form', (event, formData) => {
    let mailOptions = {
      from: formData.email,
      to: config.email.auth.user,
      subject: 'Nouveau message de contact',
      text: `Nom: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error details:', error);
        event.reply('contact-form-response', { success: false, error: error.message });
      } else {
        console.log('Email sent: ' + info.response);
        event.reply('contact-form-response', { success: true });
      }
    });
  });

  // Gérer les événements de fermeture de fenêtre
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Charger la page utilisateur avec l'ID
  ipcMain.on('load-user-home', (event, user_id) => {
    const userHomePath = path.join(getRendererPath(), 'userHomePage.ejs');
    mainWindow.loadFile(userHomePath);
    mainWindow.webContents.once('did-finish-load', () => {
      mainWindow.webContents.send('user-id', user_id);
    });
  });
}

// Créer la fenêtre principale lorsque l'application est prête
app.whenReady().then(createWindow);

// Exposer les gestionnaires d'événements IPC
ipcMain.handle('get-bitwarden', downloadBitwarden);
ipcMain.handle('submit-form', handleSubmitForm);

// Gérer les événements de fermeture de fenêtre
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