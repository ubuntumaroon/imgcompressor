const mapdir = require('./mapdir.js')
const compress2jpg = require('./compressor.js')

function compress_dir(dir, sizes, quality, callback) {
  mapdir(dir, (file) => {    
    compress2jpg(file)
      .setSizes(sizes)
      .setQuality(quality)
      .output(callback);
  })  
}

module.exports = compress_dir


