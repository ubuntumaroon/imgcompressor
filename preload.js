const {ipcRenderer} = require('electron')

function getFormValue() {
  const quality = parseInt(document.getElementById("quality").value);
  const size_inputs = document.getElementsByName("sizes")
  let sizes = Array.from(size_inputs).map(en => parseInt(en.value));
  
  return { quality, sizes }
}

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }



  const selectDirBtn = document.getElementById('select-directory')

  selectDirBtn.addEventListener('click', (event) => {
    console.log("clicked!")
    ipcRenderer.send('open-file-dialog', getFormValue())
  })

  ipcRenderer.on('selected-directory', (event, path) => {
    document.getElementById('selected-file').innerHTML = `Compressed images in: ${path}`
  })

  ipcRenderer.on('new-file-created', (event, file) =>{
    let pre = document.createElement('pre')
    pre.append(file)
    document.getElementById('logs').append(pre)
    console.log(file)
  })

})