

const downloadBtnPrivazer = document.getElementById('downloadBtn2');

downloadBtnPrivazer.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    await sendIpcRequest('get-privazer');

    //Redirection page principale
    window.location.href = '../pages/userHomePage.ejs';
    
  } catch (error) {
    console.error('Erreur lors du téléchargement ou de l\'enregistrement :', error);
  }
});