const { app, BrowserWindow } = require('electron')
const path = require('path')
const glob = require('glob')
const {ipcMain, dialog} = require('electron')


function createWindow () {
  loadProceses()

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// load main process dependecies
function loadProceses() {
  const files = glob.sync(path.join(__dirname, 'main-process/*.js'))
  files.forEach((file) => { require(file) })
}