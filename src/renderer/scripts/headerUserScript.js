document.addEventListener('DOMContentLoaded', () => {
    const burgerIcon = document.querySelector('.burger-icon');
    const navbarMenu = document.querySelector('.navbar-menu');

    burgerIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        burgerIcon.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', (e) => {
        if (!navbarMenu.contains(e.target) && !burgerIcon.contains(e.target)) {
            navbarMenu.classList.remove('active');
            burgerIcon.classList.remove('active');
        }
    });
});