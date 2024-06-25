

const downloadBtn = document.getElementById('downloadBtn');

downloadBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    await sendIpcRequest('get-bitwarden');

    //Redirection page principale
    window.location.href = '../pages/userHomePage.ejs';
    
  } catch (error) {
    console.error('Erreur lors du téléchargement ou de l\'enregistrement :', error);
  }
});