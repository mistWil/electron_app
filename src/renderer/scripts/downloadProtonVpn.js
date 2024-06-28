

const downloadBtnProtonVpn = document.getElementById('downloadBtn3');

downloadBtnProtonVpn.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    await sendIpcRequest('get-protonVpn');

    //Redirection page principale
    window.location.href = '../pages/userHomePage.ejs';
    
  } catch (error) {
    console.error('Erreur lors du téléchargement ou de l\'enregistrement :', error);
  }
});