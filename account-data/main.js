const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

function createWindow() {
  return new BrowserWindow({
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    //__dirname string points to the path of the currently executing script (Project root folder) 
    //path.join API joins multiple path segments together, creating a combined path string that works
    //across all platforms
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
}

function showMainWindow() {
  window.loadFile('../pages/login.html').then(() => { window.show() })
}

function showLoginWindow() {
  window.loadFile('../pages/home.html').then(() => { window.show() })
}

app.on('ready', () => {
  window = createWindow()
  showMainWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

//IPC
ipcMain.on('message:loginShow', (event) => {
  showLoginWindow();
})

ipcMain.on('message:loginSuccessful', (event, session) => {
  showMainWindow();
})