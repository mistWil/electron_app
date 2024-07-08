function loadPrivazerTutos() {
    console.log('Tentative de chargement des tutoriels ProtonVpn');
    ipcRenderer.send('load-protonVpn-tutos');
}