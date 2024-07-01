function loadProtonVpnTutos() {
    console.log('Tentative de chargement des tutoriels ProtonVpn');
    ipcRenderer.send('load-proton-vpn-tutos');
}