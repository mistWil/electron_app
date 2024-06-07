const logger = require("../config/logger");

const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      logger.error("Erreur dans le controleur:", err);
      next(err);
    });
  };
};

module.exports = catchAsync;

/* 
Gestion des erreurs dans catchAsync:
  - Si une erreur se produit dans votre fonction de contrôleur, elle est interceptée par .catch()
  - L'erreur est enregistrée avec logger.error()
  - L'erreur est passée au middleware de gestion des erreurs d'Express avec next(err)

  Middleware de gestion des erreurs d'Express:
  - Mis en place dans le fichier app.js pour traiter l'erreur et renvoyer une réponse appropriée 
au client

Avantages:
  - Code plus propre: ça évite la répétition du bloc try..catch dans chaque fonction du contrôleur
  - Centralisation de la gestion des erreurs: toutes les erreurs sont gérées de manière cohérente dans 
catchAsync
  - Enregistrement des erreurs: les erreurs sont enregistrées avec Winston pour faciliter le débogage

  Conclusion:
  - En combinant catchAsync et le logger Winston, cela donne une solution élégante et efficace
pour gérer les erreurs dans les contrôleurs Express. 
*/
