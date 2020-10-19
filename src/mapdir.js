const path = require('path')
const fs = require('fs')

function mapDir(dir, callback, finish) {
  fs.readdir(dir, function(err, files) {
    if (err) {
      console.error(err)
      return
    }
    files.forEach((filename, index) => {
      let pathname = path.join(dir, filename)
      fs.stat(pathname, (err, stats) => { // read file info
        if (err) {
          console.log('error to get file info')
          return
        }
        if (stats.isDirectory()) {
          mapDir(pathname, callback, finish)
        } else if (stats.isFile()) { //include only files
          callback && callback(pathname)
        }
      })
      if (index === files.length - 1) {
        finish && finish()
      }
    })
  })
}

exports.mapDir = mapDir