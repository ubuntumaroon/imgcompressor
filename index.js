const sharp = require("sharp");
const fs = require('fs');



function resize(img) {
  sharp(img).resize(500)
    .jpeg({quality: 80})
    .toFile('outpu.jpeg')
}

fs.readFile('test.jpeg', (err, img) => resize(img) )