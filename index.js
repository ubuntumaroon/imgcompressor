const sharp = require("sharp");
const fs = require('fs');
const mapdir = require('./src/mapdir.js')
const path = require('path')
const compress_img = require('./src/compressimg.js');


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
