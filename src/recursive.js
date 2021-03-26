const mapdir = require('./mapdir.js')
const compress2jpg = require('./compressor.js')

function compress_dir(dir, sizes, quality) {
  mapdir(dir, (file) => {    
    compress2jpg(file)
      .setSizes(sizes)
      .setQuality(quality)
      .output();
  })  
}

module.exports = compress_dir


