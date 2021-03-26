const {ipcMain, dialog} = require('electron')
const { watchFile } = require('fs')
const { waitForDebugger } = require('inspector')
const compress_dir = require('../src/recursive.js')

ipcMain.on('open-file-dialog', (event, args) => {
  files = dialog.showOpenDialogSync({
    properties: ['openDirectory', 'openFile']
  })
  if (files === undefined) return

  const {quality, sizes} = sanitize(args)

  files.forEach(file =>{
    compress_dir({dir:file, sizes, quality}, file => {
      event.sender.send('new-file-created', file)
    })
  })

  event.sender.send('selected-directory', { files, quality, sizes})
})

function sanitize(args) {
  let {quality, sizes} = args
  sizes = Array.from(new Set(sizes))
  return {quality, sizes}
}
