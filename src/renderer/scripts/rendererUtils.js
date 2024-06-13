const { ipcRenderer } = require('electron');

// Fonction pour envoyer une requête IPC au main process
const sendIpcRequest = (channel, data) => {
  console.log(channel, data)
  return ipcRenderer.invoke(channel, data);
};
