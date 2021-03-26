const fs = require('fs');
const path = require('path');
const compress_img = require('./compressimg.js');
const sharp = require("sharp");

const QUALITY = 80;

class Compressor {
  constructor(img) {
    this.img = img;
    this.quality = QUALITY;
    this.sizes = [0];
    this.callback
  }

  setSizes(sizes) {
    if (!Array.isArray(sizes))
      sizes = [sizes]
    this.sizes = sizes;
    return this;
  }

  setQuality(quality) {
    this.quality = quality;
    return this;
  }

  output(callback) {
    if (!this.isImg() || this.isCompressed())
      return;
    
    this.sizes.forEach(size => {
      this.output_one(size, callback)
    });
  }

  output_one(size, callback) {
    if (!Number.isInteger(size) || size <= 0)
      size = undefined
    
    const new_file = this.createName(size)
    fs.access(new_file, fs.F_OK, (err) => {
      if (err) { // file not exist, convert
        callback && callback(new_file)
        compress_img(this.img, new_file, {size, quality: this.quality})
      } 
    })
  }

  isImg() {
    return ['.jpg', '.jpeg', '.png'].includes(path.extname(this.img).toLowerCase())
  }

  isCompressed() {
    return this.img.endsWith(this.nameEnd())
  }

  nameEnd() {
    return `_${this.quality}.jpeg`
  }

  createName(size) {
    const base = this.img.split('.').slice(0, -1).join('.');
    if (size === undefined)
      return `${base}${this.nameEnd()}`;
    else
      return `${base}_${size}${this.nameEnd()}`;
  }
}

function compress2jpg(img) {
  return new Compressor(img);
}


module.exports = compress2jpg