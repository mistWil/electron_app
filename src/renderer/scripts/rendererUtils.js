const { ipcRenderer } = require('electron');

const sendIpcRequest = (channel, data) => {
  console.log(`Sending IPC request on channel: ${channel} with data:`, data);
  return ipcRenderer.invoke(channel, data);
};

module.exports = { sendIpcRequest };