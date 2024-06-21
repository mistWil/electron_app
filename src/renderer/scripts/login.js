// Importer la fonction sendIpcRequest depuis le fichier rendererUtils.js
// const { sendIpcRequest } = require('./rendererUtils');
const sendRequestWithToken = require("../../main/requestTokenHandler");
// Sélectionner le formulaire de connexion
const loginForm = document.getElementById('loginForm');

// Fonction pour afficher un message d'erreur
function showErrorMessage(message) {
  const errorMessageElement = document.getElementById('error-message');
  if (errorMessageElement) {
    errorMessageElement.textContent = message;
  }
}

// Gestionnaire d'événement pour la soumission du formulaire de connexion
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Empêcher le rechargement de la page

  // Récupérer les valeurs des champs du formulaire
  const loginValues = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };

  try {
    // Envoyer les données du formulaire au processus principal
    const response = await sendIpcRequest('login-form', loginValues);

    if (response.success) {
      // Connexion réussie
      console.log('Connexion réussie :', response.success);
      console.log('Jeton d\'authentification :', response.token);

      // Stocker le jeton d'authentification dans le stockage local
      localStorage.setItem('authToken', response.token);

      // Rediriger vers la page userHomePage.ejs
      window.location.href = '../pages/userHomePage.ejs';
      // Appeler la fonction pour récupérer les données de session
      fetchProtectedData();
    } else {
      // Erreur de connexion
      console.error('Erreur lors de la connexion :', response.error);
      showErrorMessage(`Erreur de connexion : ${response.error}. Veuillez réessayer.`);

      // Réinitialiser les champs du formulaire
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
    }
  } catch (error) {
    // Erreur lors de la soumission du formulaire
    console.log('Erreur lors de la soumission du formulaire :', error);
    showErrorMessage('Une erreur est survenue lors de la soumission du formulaire. Veuillez réessayer.');
  }
});

// Fonction pour envoyer une requête GET à la route protégée
const fetchProtectedData = async () => {
  try {
    const response = await sendRequestWithToken('/protected-route', 'get');
    console.log('Protected route response:', response);
  } catch (error) {
    console.log('Erreur lors de la récupéréation des données protégées :', error);
  }
};