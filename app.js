// Importation des modules nécessaires
const express = require("express");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const flash = require("connect-flash");
const path = require("path");
const mongoose = require("mongoose");

// Importation des routes
const userRoutes = require("./routes/user.routes");
const updatesLogRoutes = require("./routes/updatesLog.routes");
const securityToolsRoutes = require("./routes/securityTools.routes");
const downloadHistoryRoutes = require("./routes/downloadHistory.routes");
const appConfigRoutes = require("./routes/appConfig.routes");
const bitwardenRoutes = require("./routes/appConfig.routes");
const catchAsync = require("./helpers/catchAsync");
const logger = require("./config/logger");

// Fonction pour charger les variables d'environnement à partir du fichier .env
// L'idée est de séparer les données sensibles (chaînes de connexion, clés API, etc.) du reste du projet
const loadEnvVariables = catchAsync(async () => {
  require("dotenv").config();
});
loadEnvVariables();

// Création de l'application Express
const app = express();

// Configuration du moteur de rendu de vues (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));

// Configuration des middlewares
app.use(express.static("public")); // Sert les fichiers statiques à partir du dossier 'public'
app.use(express.urlencoded({ extended: false })); // Analyse les données de formulaire encodées dans l'URL
app.use(express.json()); // Analyse les données de requête au format JSON

// Connexion à MongoDB
const connectToMongoDB = catchAsync(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
});
connectToMongoDB();

// Routes
// app.get("/", (req, res) => {
//   res.render("home");
// });
   app.get('/', (req, res) => {
     res.send('Welcome to the Protect Yourself API');
   });

// Utilisation des routes définies dans les fichiers de routes
app.use("/", userRoutes);
app.use("/", updatesLogRoutes);
app.use("/", securityToolsRoutes);
app.use("/", downloadHistoryRoutes);
app.use("/", appConfigRoutes);
app.use("/bitwarden", bitwardenRoutes);

// Middleware pour gérer les routes non trouvées
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  logger.error("Erreur non gérée:", err); // Enregistrement de l'erreur avec Winston
  const statusCode = err.statusCode || 500; // Utilisation du code d'état de l'erreur ou 500 par défaut
  res.status(statusCode).json({
    message: err.message || "Erreur interne du serveur",
  });
});

// Démarrage du serveur
// app.listen(process.env.PORT || 3000, () => {
//   console.log(`Application launched on port ${process.env.PORT || 3000}`);
// });
  app.listen(3000, () => {
     console.log(`API server running at http://localhost:${process.env.PORT || 3000}`);
   });


/*
Concernant l'utilisation du middleware de gestion des erreurs:
  - Il prend 4 arguments: err (l'objet d'erreur), req (l'objet de requête), res (l'objet de réponse),
    et next (une fonction pour passer au middleware suivant)
  - L'erreur est enregistrée avec logger.error() pour faciliter le débogage
  - Le code d'état HTTP approprié est déterminé en utilisant err.statusCode
    (si l'erreur a un code d'état personnalisé) ou 500 (Internal Server Error) par défaut
  - Une réponse JSON est envoyée au client avec le code d'état et un message d'erreur
*/
