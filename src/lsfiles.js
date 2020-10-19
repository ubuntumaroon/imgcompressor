const path = require('path');
const fs = require('fs');
const sharp = require("sharp");


function resize(img, out) {
  console.log(out)
  sharp(img).resize(500)
    .jpeg({quality: 80})
    .toFile(out)
}

function run(input, out) {
  console.log(input)
  let img = fs.readFileSync(input)
  resize(img, out);
}

//joining path of directory 
const input_path = path.join(__dirname, '../images');
const output_path = path.join(__dirname, '../output');
//passsing directoryPath and callback function
let dirs = fs.readdirSync(input_path);
dirs.forEach( (dir) => {
  const full_path = path.join(input_path, dir)
  const out_dir_path = path.join(output_path, dir)
  if (!fs.lstatSync(full_path).isDirectory())
    return;
  if (!fs.existsSync(out_dir_path)){
      fs.mkdirSync(out_dir_path);
  }
  //console.log(full_path)
  const files = fs.readdirSync(full_path);
  //console.log('Working on: ' + dir)
  files.forEach((file) => {

    const input_file = path.join(full_path, file)
    const output_file = path.join(out_dir_path, file)
    run(input_file, output_file)
    //console.log("Input: ", input_file)
    //console.log("Output: ", output_file)
  })
})

// fs.readdir(directoryPath, function (err, files) {
//     //handling error
//     if (err) {
//         return console.log('Unable to scan directory: ' + err);
//     } 
//     //listing all files using forEach
//     files.forEach(function (file) {
//         // Do whatever you want to do with the file
//         console.log('Dir....' + file)
//         fs.readdir(path.join(directoryPath, file), (err, file2) => {
//           file2.forEach(function (img) {
//             console.log(file + '/' + img)
//           })
//         })
//     });
// });