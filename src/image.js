const fs = require('fs');
const path = require('path')
const compress_img = require('./compressimg.js');

const QUALITY = 80

function create_name(file, {size, quanlity=QUALITY}) {
  const base = file.split('.').slice(0, -1).join('.')
  if (size === undefined)
    return `${base}_${quanlity}.jpeg`
  else
    return `${base}_${size}_${quanlity}.jpeg`
}

// simply check the file extension
function is_img(file) {
  return ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase())
}

function is_compressed_img(file, quality=QUALITY) {
  return file.endsWith(`_${quality}.jpeg`)
}

function compress_one(file, {size, quanlity=QUALITY}) {
  const new_file = create_name(file, {size, quanlity})
  fs.access(new_file, fs.F_OK, (err) => {
    if (err) { // file not exist, convert
      console.log(new_file)
      compress_img(file, new_file, {size: size})
    } 
  })
}

function compress(file, sizes, quality = QUALITY) {
  if (!is_img(file) || is_compressed_img(file)) return
  
  compress_one(file, {quality})
  sizes.forEach(size => {
    compress_one(file, {size, quality})
  })
}

module.exports = compress