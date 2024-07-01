const { exec } = require('child_process');

const geekUninstallerPath = ('./geek.exe');

const launchGeekUninstaller = () => {
  exec(geekUninstallerPath, (err, stdout, stderr) => {
    if (err) {
      console.error('Error launching Geek Uninstaller:', err);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  })
}

module.exports = launchGeekUninstaller;
