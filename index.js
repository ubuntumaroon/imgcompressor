const sharp = require("sharp");
const fs = require('fs');
const mapdir = require('./src/mapdir.js')
const path = require('path')



function resize(img, output, size) {
  fs.readFile(img, (err, img) => {
    if (err) {
      console.error(err)
      return
    }

    sharp(img).resize(size)
    .jpeg({quality: 80})
    .toFile(output)
  });
}

function compress(img, output) {
  fs.readFile(img, (err, img) => {
    if (err) {
      console.error(err)
      return
    }

    sharp(img)
    .jpeg({quality: 80})
    .png({quality: 80})
    .toFile(output)
  });
}

function run(file) {
  if (!['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase())) 
    console.log(file);
  console.log(file);
  
  const base = file.split('.').slice(0, -1).join('.');
  const ext = path.extname(file);
  let newname = base + '_80' + ext;
  console.log(newname);
  compress(file, newname);
  newname = base + '-1000x1000_80' + ext;
  console.log(newname);
  resize(file, newname, 1000);
   newname = base + '-500x500_80' + ext;
   console.log(newname);
   resize(file, newname, 500);
}

// run('test.jpeg', 'output/new.jpeg');
// compress('test.jpeg', 'output/new2.jpeg');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Please input a folder")
} else {
  console.log("Working on:", args[0]);

  mapdir(args[0], (file) => {
    run(file);
  })
}
