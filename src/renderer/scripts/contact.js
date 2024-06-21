const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            ipcRenderer.send('submit-contact-form', formData);
        });

        ipcRenderer.on('contact-form-response', (event, response) => {
            if (response.success) {
                alert('Message envoyé avec succès !');
                contactForm.reset();
            } else {
                alert(`Erreur lors de l'envoi du message : ${response.error}. Veuillez réessayer.`);
            }
        });
    }
});