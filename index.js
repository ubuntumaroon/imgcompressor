const mapdir = require('./src/mapdir.js')
const compress = require('./src/image.js')

const QUALITY = 80
const SIZES = [500, 1000]

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Please input a folder")
} else {
  console.log("Working on:", args[0]);

  mapdir(args[0], (file) => {    
    compress(file, SIZES, QUALITY)
  })
}
