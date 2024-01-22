const fs = require('fs').promises;
const path = require('path');

async function buildPage() {
  await fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });

  const templateContent = await fs.readFile(
    path.join(__dirname, 'template.html'),
    'utf-8',
  );

  const componentFiles = await fs.readdir(path.join(__dirname, 'components'));

  let resultContent = templateContent;
  for (const componentFile of componentFiles) {
    const componentName = path.parse(componentFile).name;
    const componentContent = await fs.readFile(
      path.join(path.join(__dirname, 'components'), componentFile),
      'utf-8',
    );

    const tag = `{{${componentName}}}`;
    resultContent = resultContent.replace(
      new RegExp(tag, 'g'),
      componentContent,
    );
  }

  await fs.writeFile(
    path.join(__dirname, 'project-dist/index.html'),
    resultContent,
    'utf-8',
  );
  let mergedStyles = '';
  const styleFiles = await fs.readdir(path.join(__dirname, 'styles'));
  for (const file of styleFiles) {
    const filePath = path.join(__dirname, 'styles', file);

    if (path.extname(file).slice(1) === 'css') {
      const fileContent = await fs.readFile(
        path.join(__dirname, 'styles', file),
        'utf8',
      );
      mergedStyles += fileContent;
    }
  }

  await fs.writeFile(
    path.join(__dirname, 'project-dist/style.css'),
    mergedStyles,
    'utf8',
  );

  const pathAssets = path.join(__dirname, 'assets');
  const pathCopyAsets = path.join(__dirname, 'project-dist/assets');

  copyDirectory(pathAssets, pathCopyAsets);
}

async function copyDirectory(pathFolder, pathCopyFolder) {
  await fs.mkdir(pathCopyFolder, { recursive: true });

  const files = await fs.readdir(pathFolder);

  for (const file of files) {
    const pathFiles = path.join(pathFolder, file);
    const pathCopyFiles = path.join(pathCopyFolder, file);

    const stats = await fs.stat(pathFiles);

    if (stats.isDirectory()) {
      await copyDirectory(pathFiles, pathCopyFiles);
    } else {
      await fs.copyFile(pathFiles, pathCopyFiles);
    }
  }
}
buildPage();
