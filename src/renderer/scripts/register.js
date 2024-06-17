

// Sélectionner le formulaire
const form = document.getElementById('userForm');

// Ajouter un gestionnaire d'événement pour la soumission du formulaire
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Récupérer les données du formulaire
  const formData = {
    firstname: document.getElementById('firstname').value,
    lastname: document.getElementById('lastname').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };

  try {
    // Envoyer les données du formulaire au main process
    const response = await sendIpcRequest('submit-form', formData);
    console.log(response);

    window.location.href = '../pages/login.ejs';


    // Gérer la réponse de succès (réinitialiser le formulaire, afficher un message, etc.)
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire :', error);
    // Gérer l'erreur (afficher un message d'erreur, etc.)
  }
});