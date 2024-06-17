

// Sélectionner le formulaire
const loginForm = document.getElementById('loginForm');

// Ajouter un gestionnaire d'événement pour la soumission du formulaire
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Empêcher le rechargement de la page

  // Récupérer les valeurs des champs
  const loginValues = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };

  try {
    // Envoyer les données du formulaire au main process
    const response = await sendIpcRequest('login-form', loginValues);

    
    if (response.success) {
      
      // Stocker le jeton d'authentification dans le stockage local
      localStorage.setItem('authToken', response.token);
      // Rediriger vers la page userHomePage.ejs
      window.location.href = '../pages/userHomePage.ejs';
      } else {
        // Gérer l'erreur (afficher un message d'erreur, etc.)
        console.error('Erreur lors de la connexion :', response.error);
        window.location.href = '../pages/register.ejs';
    }
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire :', error);
    // Gérer l'erreur (afficher un message d'erreur, etc.)
  }
});