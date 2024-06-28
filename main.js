const { app, BrowserWindow, ipcMain, protocol } = require('electron');
const path = require('path');
const config = require('./config');
const { getAppPath, getRendererPath } = require('./src/main/mainUtils');
const handleSubmitForm = require('./src/main/submitRegister');
const downloadBitwarden = require('./src/main/bitwardenDownload');
const ejse = require('ejs-electron');
const loginSubmitForm = require('./src/main/submitLogin');
const nodemailer = require('nodemailer');
const getUserData = require('./src/main/getUserData');
const fs = require('fs');
const downloadPrivazer = require('./src/main/privazerDownload');
const downloadProtonVpn = require('./src/main/protonVpnDownloads');

// Reloader (pour le développement)
try {
  require('electron-reloader')(module);
} catch {}

// Vérifie si l'application est en mode développement
const isDev = process.env.NODE_ENV === "development";

// Fenêtre principale
let mainWindow;

// Variable globale pour stocker les données utilisateur
global.user = null;

// Fonction pour créer la fenêtre principale
function createWindow() {
  // Charger les données utilisateur depuis le fichier JSON
  try {
    const data = fs.readFileSync('./src/jsonFiles/userSession.json', 'utf8');
    if (data) {
      global.user = JSON.parse(data);
    }
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier userSession.json:', error);
  }

  // Création de la fenêtre principale
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'src/preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
  });

  // Définir le répertoire de base pour l'application
  global.__basedir = app.getAppPath();

  // Charger la page d'index EJS
  const indexPath = path.join(__dirname, 'src', 'renderer', 'pages', 'index.ejs');
  console.log('Chemin d\'accès au fichier index.ejs :', indexPath);
  mainWindow.loadFile(indexPath);

  // Gestionnaires d'événements IPC
  ipcMain.handle('login-form', loginSubmitForm);
  ipcMain.handle('get-user-data', getUserData);
  ipcMain.handle('get-bitwarden', downloadBitwarden);
  ipcMain.handle('submit-form', handleSubmitForm);
  ipcMain.handle('get-privazer', downloadPrivazer);
  ipcMain.handle('get-protonVpn', downloadProtonVpn);

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
        console.log('Erreur d\'envoi d\'email:', error);
        event.reply('contact-form-response', { success: false, error: error.message });
      } else {
        console.log('Email envoyé:', info.response);
        event.reply('contact-form-response', { success: true });
      }
    });
  });

  // Gestionnaire pour charger la page d'accueil utilisateur
  ipcMain.on('load-user-home', (event, user_id) => {
    const userHomePath = path.join(__dirname, 'src', 'renderer', 'pages', 'userHomePage.ejs');
    mainWindow.loadFile(userHomePath);
    mainWindow.webContents.once('did-finish-load', () => {
      mainWindow.webContents.send('user-id', user_id);
    });
  });

  // Gestionnaire pour charger la page des tutoriels Bitwarden
  ipcMain.on('load-bitwarden-tutos', (event) => {
    console.log('Événement load-bitwarden-tutos reçu');
    const bitwardenTutosPath = path.join(__dirname, 'src', 'renderer', 'pages', 'bitwardenTutos.ejs');
    console.log('Chemin du fichier bitwardenTutos:', bitwardenTutosPath);
    if (fs.existsSync(bitwardenTutosPath)) {
        console.log('Le fichier bitwardenTutos.ejs existe, chargement...');
        mainWindow.loadFile(bitwardenTutosPath);
    } else {
        console.error('Le fichier bitwardenTutos.ejs n\'existe pas');
        event.reply('error', 'Le fichier des tutoriels Bitwarden n\'a pas été trouvé');
    }
});
  
  // Gestionnaire pour charger la page des outils
  ipcMain.on('load-tools-page', (event) => {
    const toolsPath = path.join(__dirname, 'src', 'renderer', 'pages', 'listOfTools.ejs');
    console.log('Chargement de la page des outils:', toolsPath);
    mainWindow.loadFile(toolsPath)
      .then(() => console.log('Page des outils chargée avec succès'))
      .catch(err => console.error('Erreur lors du chargement de la page des outils:', err));
  });

  // Ouvrir les outils de développement en mode développement
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Gérer les événements de fermeture de fenêtre
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Créer la fenêtre principale et enregistrer le protocole personnalisé lorsque l'application est prête
app.whenReady().then(() => {
  // Enregistrer un protocole de fichier personnalisé pour servir les vidéos
  protocol.registerFileProtocol('video', (request, callback) => {
    const url = request.url.substr(8);
    const filePath = path.normalize(`${__dirname}/src/renderer/videos/${url}`);
    console.log('Requested video file:', filePath);
    callback({ path: filePath });
  });

  createWindow();
});

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