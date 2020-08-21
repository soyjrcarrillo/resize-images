'use strict'

// Librerías
const easyimg = require('easyimage');
const path = require('path');
const fs = require('fs');

// Direcciones originales
const original = path.join(__dirname + '/assets', '/original');

// FormatText
const formatText = (() => {
  let from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
    to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
    mapping = {};

  for (let i = 0, j = from.length; i < j; i++)
    mapping[from.charAt(i)] = to.charAt(i);

  return function (str) {
    let ret = [];
    for (let i = 0, j = str.length; i < j; i++) {
      let c = str.charAt(i);
      if (mapping.hasOwnProperty(str.charAt(i)))
        ret.push(mapping[c]);
      else
        ret.push(c);
    }
    // return ret.join( '' );
    return ret.join('').replace(/[^-A-Za-z0-9]+/g, '-').toLowerCase();
  }
})();

// Leer un directorio
fs.readdir(original, (err, files) => {

  if (err) { // Directorio erroneo
    return console.log('Unable to scan directory: ' + err);
  }

  files.forEach((file, index) => { // lee los archivos en la carpeta
    if (file.split('.').pop() === 'png') {
      const tmpTitle = `${formatText(file.split('.')[0])}.jpg`;
      const tmpOriginal = path.join(__dirname + '/assets/original', file);
      const tmpConvert = path.join(__dirname + '/assets/convert', tmpTitle);

      console.log(`CARGANDO: ${tmpTitle} posición ${index + 1}/${files.length}`);

      easyimg.convert({
          src: tmpOriginal,
          dst: tmpConvert,
          width: 480,
          height: 480,
          quality: 70,
        },
        (err, stdout) => {
          if (stdout) {
            console.log('stdout: ', stdout);
          }
        }
      );

    } else if (file.split('.').pop() === 'jpg') {
      const tmpTitle = `${formatText(file.split('.')[0])}.jpg`;
      const tmpOriginal = path.join(__dirname + '/assets/original', file);
      const tmpConvert = path.join(__dirname + '/assets/convert', tmpTitle);

      console.log(`CARGANDO: ${tmpTitle} posición ${index + 1}/${files.length}`);

      easyimg.resize({
          src: tmpOriginal,
          dst: tmpConvert,
          width: 480,
          height: 480,
          quality: 70,
        })
        .then(r => {
          console.log('OK: ', r.name);
        })
        .catch(err => {
          console.log(err);
        });
    }

  });
});
