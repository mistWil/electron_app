function loadBitwardenTutos() {
    console.log('Tentative de chargement des tutoriels Bitwarden');
    ipcRenderer.send('load-bitwarden-tutos');
}