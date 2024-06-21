const { ipcRenderer } = require('electron');

const sendIpcRequest = (channel, data) => {
  console.log(channel, data);
  return ipcRenderer.invoke(channel, data);
};

module.exports = { sendIpcRequest };