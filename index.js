const mapdir = require('./src/mapdir.js')
const compress2jpg = require('./src/compressor.js')
const cli = require('./src/cli.js')

// default values
// const QUALITY = 80
// const SIZES = [500, 1000]


const { dir, sizes, quality } = cli()

console.log("Working on:", dir)

mapdir(dir, (file) => {    
  compress2jpg(file)
    .setSizes(sizes)
    .setQuality(quality)
    .output();
})

