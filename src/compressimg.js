const sharp = require("sharp");
const fs = require('fs');


function compress_img(img, output, {size, quality=80}) {
  fs.readFile(img, (err, img) => {
    if (err) {
      console.error(err)
      return
    }
    const image = sharp(img)
    image.metadata().then(function(metadata) {
      if (size === undefined || metadata.width > size){
        image.resize(size)
        .jpeg({quality: quality, force: false})
        .toFile(output) 
      }
    })
  })
}

module.exports = compress_img