document.addEventListener('DOMContentLoaded', function() {
    const burgerIcon = document.querySelector('.burger-icon');
    const navbarMenu = document.querySelector('.navbar-menu');

    if (burgerIcon && navbarMenu) {
        burgerIcon.addEventListener('click', function() {
            this.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });

        // Fermer le menu lorsqu'un lien est cliqué
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burgerIcon.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });
    } else {
        console.error('Burger icon or navbar menu not found');
    }
});