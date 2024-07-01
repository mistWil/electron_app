const axios = require('axios');
const config = require('../../config');
const fs = require('fs');
const os = require('os');
const getUserData = require('./getUserData');


// Define paths to software executables
const getSoftwarePaths = () => {
  const platform = os.platform();
  if (platform === 'win32') {
    return {
      'Bitwarden': [
        'C:\\Program Files\\Bitwarden',
        'C:\\Program Files (x86)\\Bitwarden'
      ],
      'Privazer': [
        'C:\\Program Files\\PrivaZer',
        'C:\\Program Files (x86)\\PrivaZer'
      ],
    };
  } else if (platform === 'darwin') {
    return {
      'Bitwarden': '/Applications/Bitwarden',
      'Privazer': '/Applications/PrivaZer',
    };
  } else if (platform === 'linux') {
    return {
      'Bitwarden': '/usr/bin/bitwarden',
      'Privazer': '/usr/bin/privaZer',
    };
  }
};

const softwarePaths = getSoftwarePaths();

// Function to check if software is installed
const isSoftwareInstalled = (software) => {
  const softwarePath = softwarePaths[software];
  // Vérification si les chemins récupérés sont un tableau:
  if (Array.isArray(softwarePath)) {
    return softwarePath.some(paths => fs.existsSync(paths));
  }
  return fs.existsSync(softwarePath);
}

// Function to delete software from download history if not installed
const deleteSoftware = async (mainWindow) => {
  try {
    const userData = await getUserData();
    const downloadHistory = userData.downloadHistory;

    console.log('Starting software check');

    for (const download of downloadHistory) {
      const softwareName = download.security_tool_id.name;
      console.log('checking for software:', softwareName);
      if (!isSoftwareInstalled(softwareName)) {
        await axios.delete(`${config.api.url}/downloadHistory/${download._id}`);
        console.log('Software deleted from download history:', softwareName);

        // Send an IPC message to the renderer process
        mainWindow.webContents.send('software-status-updated', {
          softwareName: softwareName,
          status: 'uninstalled'
        });
      }
    }
    console.log('Software check completed');
  } catch (error) {
    console.error('Error deleting software', error);
  }
};

module.exports = deleteSoftware;
