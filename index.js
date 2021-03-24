const sharp = require("sharp");
const fs = require('fs');
const mapdir = require('./src/mapdir.js')
const path = require('path')
const compress_img = require('./src/compressimg.js');


// resize image if size smaller than original width
function resize(img, output, size) {
  fs.readFile(img, (err, img) => {
    if (err) {
      console.error(err)
      return
    }
    const image = sharp(img);
    image.metadata()
    .then(function(metadata) {
      if (metadata.width > size) {
        image.resize(size)
          .jpeg({quality: 80})
          .toFile(output)
      } 
    });
  });
}

// compress to jpg, 80%
function compress(img, output) {
  fs.readFile(img, (err, img) => {
    if (err) {
      console.error(err)
      return
    }

    sharp(img)
    .jpeg({quality: 80, force: false})
    .toFile(output)
  });
}


const QUALITY = 80
const SIZES = [500, 1000]

function create_name(file, {size, quanlity=QUALITY}) {
  const base = file.split('.').slice(0, -1).join('.')
  if (size === undefined)
    return `${base}_${quanlity}.jpeg`
  else
    return `${base}_${size}_${quanlity}.jpeg`
}

function convert(file, {size, quanlity=QUALITY}) {
  const new_file = create_name(file, {size, quanlity})
  fs.access(new_file, fs.F_OK, (err) => {
    if (err) { // file not exist, convert
      console.log(new_file)
      compress_img(file, new_file, {size: size})
    } 
  })
}

// simply check the file extension
function is_img(file) {
  return ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase())
}

function is_compressed_img(file, quality=QUALITY) {
  return file.endsWith(`_${quality}.jpeg`)
}

function perform(file) {
  if (!is_img(file) || is_compressed_img(file)) return
  
  convert(file, {})
  SIZES.forEach(size => {
    convert(file, {size: size})
  })
}

function run(file) {
  if (!['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase())) 
    return;
  
  const base = file.split('.').slice(0, -1).join('.');
  let ext = path.extname(file);
  if (ext.toLowerCase() === '.png') {
    ext = '.jpeg'
  }
  
  let newname = base + '_80' + ext;
  console.log(newname);
   compress(file, newname);
  newname = base + '-1000_80' + ext;
  console.log(newname);
  resize(file, newname, 1000);
   newname = base + '-500_80' + ext;
   console.log(newname);
   resize(file, newname, 500);
}


const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Please input a folder")
} else {
  console.log("Working on:", args[0]);

  mapdir(args[0], (file) => {
    //run(file);
    perform(file)
  })
}
