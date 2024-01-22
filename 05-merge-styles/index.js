const fs = require('fs').promises;
const path = require('path');

async function mergeStyles() {
  const files = await fs.readdir(path.join(__dirname, 'styles'));
  let mergedStyles = '';

  for (const file of files) {
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
    path.join(__dirname, 'project-dist/bundle.css'),
    mergedStyles,
    'utf8',
  );
}

mergeStyles();
