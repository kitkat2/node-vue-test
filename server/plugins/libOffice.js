// module.exports = app => {
//   const libre = require('libreoffice-convert');

//   const path = require('path');
//   const fs = require('fs');

//   const extend = '.xml'
//   const enterPath = path.join(__dirname, '/resources/word.pdf');
//   const outputPath = path.join(__dirname, `/resources/word${extend}`);

//   // Read file
//   const file = fs.readFileSync(enterPath);
//   console.log(file)
//   // Convert it to pdf format with undefined filter (see Libreoffice doc about filter)
//   libre.convert(file, extend, null ,(err, done) => {
//     if (err) {
//       console.log(`Error converting file: ${err}`);
//     }

//     // Here in done you have pdf file which you can save or transfer in another stream
//     fs.writeFileSync(outputPath, done);

//   });
// }