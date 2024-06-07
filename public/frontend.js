// main.js
import axios from 'axios';


//FORMULAIRE

// Sélectionner le formulaire
const form = document.getElementById('userForm');

// Ajouter un gestionnaire d'événement pour la soumission du formulaire
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Récupérer les données du formulaire
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    // Envoyer une requête POST à la route '/user' avec Axios
    const response = await axios.post('/user', data);
    console.log(response.data);
    // Gérer la réponse de succès (réinitialiser le formulaire, afficher un message, etc.)
  } catch (error) {
    console.error(error);
    // Gérer l'erreur (afficher un message d'erreur, etc.)
  }
});

//DOWNLOAD BUTTON FOR SOFTWARE

// Sélectionne l'élément <a> dont l'attribut href commence par "https://vault.bitwarden.com/download/"
const downloadLink = document.querySelector('a[href^="https://vault.bitwarden.com/download/"]');

// Fonction appelée lorsque l'utilisateur clique sur le lien de téléchargement
function handleDownload(event) {
  // Empêche le comportement par défaut du lien (navigation vers l'URL)
  event.preventDefault();

  // Récupère l'URL complète du lien à partir de la propriété href de l'élément cible
  const downloadUrl = event.currentTarget.href;

  // Ouvre une nouvelle fenêtre ou un nouvel onglet avec l'URL de téléchargement
  // Le second argument '_blank' indique d'ouvrir une nouvelle fenêtre/onglet vide
  window.open(downloadUrl, '_blank');
}

// Ajoute un écouteur d'événement 'click' au lien de téléchargement
// Lorsque l'utilisateur clique sur le lien, la fonction handleDownload est appelée
downloadLink.addEventListener('click', handleDownload);

