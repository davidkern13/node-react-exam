const fs = require('fs');

async function writeFile ({path, content}) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, err => {
            if (err) {
              reject(err);
            }
            resolve(true);
        });
    });
}

async function readFile({path}) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

module.exports = { writeFile, readFile };

    
