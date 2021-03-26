const {ipcMain, dialog} = require('electron')
const compress_dir = require('../src/recursive.js')

ipcMain.on('open-file-dialog', (event, args) => {
  files = dialog.showOpenDialogSync({
    properties: ['openDirectory', 'openFile']
  })

  const {quality, sizes} = args
  size = Array.from(new Set(sizes))
  files.forEach(file =>{
    console.log("processing")
    compress_dir(file, size, quality)
  })

  event.sender.send('selected-directory', { files, quality, size})
})

function sanitize(args) {
  let {quality, sizes} = args
  sizes = Array.from(new Set(sizes))
  return {quality, sizes}
}