const { spawn } = require('child_process');
const path = require('path');

const geekUninstallerPath = path.join(__dirname, '..', '..', 'geek.exe');
console.log('Chemin vers geek uninstaller:', geekUninstallerPath);

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
