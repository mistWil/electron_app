document.addEventListener('DOMContentLoaded', function() {
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function (event) {
      event.preventDefault(); // Empêche le lien de rediriger
      this.parentElement.classList.toggle('active'); // Ajoute/supprime la classe 'active' pour afficher/masquer le menu
    });
  });
});