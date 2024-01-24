const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    const pathFile = path.join(path.join(__dirname, 'secret-folder'), file);

    fs.stat(pathFile, (err, stats) => {
      if (err) throw err;

      if (stats.isFile()) {
        console.log(
          `${path.parse(file).name} - ${path.parse(file).ext.slice(1)} - ${
            stats.size
          } байт`,
        );
      }
    });
  });
});
