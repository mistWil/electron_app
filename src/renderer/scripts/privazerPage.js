function loadPrivazerTutos() {
    console.log('Tentative de chargement des tutoriels Privazer');
    ipcRenderer.send('load-privazer-tutos');
}