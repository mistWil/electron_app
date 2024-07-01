document.getElementById('launch-geek-uninstaller').addEventListener('click', () => {
  ipcRenderer.invoke('launch-geek-uninstaller')
    .then(() => {
      console.log('Geek Uninstaller launched successfully');
    })
    .catch((error) => {
      console.error('Error launching Geek Uninstaller:', error);
    });
});
