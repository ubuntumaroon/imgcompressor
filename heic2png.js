const sharp = require("sharp");
const fs = require('fs');
const mapdir = require('./src/mapdir.js')
const path = require('path')
const convert = require('heic-convert');
const { promisify } = require('util');

function convert_heic(img, out_name) {
  console.log('finished one')
  (async () => {
    const inputBuffer = await promisify(fs.readFile)(img);
    const outputBuffer = await convert({
      buffer: inputBuffer, // the HEIC file buffer
      format: 'JPEG',      // output format
      quality: 1           // the jpeg compression quality, between 0 and 1
    });
  
    await promisify(fs.writeFile)(out_name, outputBuffer);
  })();

  console.log('finished one')
  fs.readFile(img, (err, img) => {
    if (err) {
      console.error(err)
      return
    }
    convert({
      buffer: img,
      format:'jpeg',
      quality: 1
    }).then(output => {
      fs.writeSync(out_name, output)
      console.log('writing file', out_name)
    })
  })
}


function run(file) {
  if (!['.heic'].includes(path.extname(file).toLowerCase())) 
    return;
  console.log(file);
  
  const base = file.split('.').slice(0, -1).join('.');
  let ext = path.extname(file);
  newname = base + '.jpeg';
  convert_heic(file, newname)
}

// run('test.jpeg', 'output/new.jpeg');
// compress('test.jpeg', 'output/new2.jpeg');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Please input a folder")
} else {
  console.log("Working on:", args[0]);

  mapdir(args[0], (file) => {
    run(file);
  })
}
