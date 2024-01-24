const fs = require('fs').promises;
const path = require('path');

const pathFolder = path.join(__dirname, 'files');
const pathCopyFolder = path.join(__dirname, 'files-copy');

async function copyDirectory(pathFolder, pathCopyFolder) {
  await fs.mkdir(pathCopyFolder, { recursive: true });

  const filesCopy = await fs.readdir(pathCopyFolder);
  for (const file of filesCopy) {
    await fs.unlink(path.join(pathCopyFolder, file));
  }

  const files = await fs.readdir(pathFolder);

  for (const file of files) {
    const pathFiles = path.join(pathFolder, file);
    const pathCopyFiles = path.join(pathCopyFolder, file);

    const stats = await fs.stat(pathFiles);

    if (stats.isFile()) {
      await fs.copyFile(pathFiles, pathCopyFiles);
    }
  }
}
copyDirectory(pathFolder, pathCopyFolder);
