const { spawn } = require('child_process');
const path = require('path');
const { app } = require('electron');
const fs = require('fs');

// Stockage de geek.exe dans le dossier userData pour la persistance des données
const geekUninstallerPath = path.join(app.getPath('userData'), 'geek.exe');
const originalGeekPath = path.join(__dirname, '..', '..', 'geek.exe');

if (!fs.existsSync(geekUninstallerPath)) {
  fs.copyFileSync(originalGeekPath, geekUninstallerPath);
}

// Function that launches geek.exe using Node.js's child_process.spawn method
// Spawn creates a new process and allows the command to be run inside a shell
const launchGeekUninstaller = () => {
  const child = spawn(geekUninstallerPath, [], { shell: true });

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  child.on('error', (err) => {
    console.error('Error launching Geek Uninstaller:', err);
  });

  child.on('close', (code) => {
    console.log(`Geek Uninstaller exited with code ${code}`);
  });
};

module.exports = launchGeekUninstaller;
