const mapdir = require('./src/mapdir.js')
const compress = require('./src/image.js')
const cli = require('./src/cli.js')

// default values
// const QUALITY = 80
// const SIZES = [500, 1000]


const { dir, sizes, quality } = cli()

console.log("Working on:", args[0])

mapdir(dir, (file) => {    
  compress(file, sizes, quality)
})

