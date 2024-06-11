const { ipcRenderer } = require('electron');

document.getElementById('downloadBtn').addEventListener('click', async () => {
    event.preventDefault();
    const userId = '665dc34ade6d37330168a834'; // Replace with the current user ID
    const softwareId = '66670f0c1a568688608ea2ec'; // Replace with the software ID

    await ipcRenderer.invoke('download-software', userId, softwareId);
});
