const { connect, ping } = require('./server.js');


const { app, BrowserWindow } = require('electron');


const createWindow=()=>{
  const win = new BrowserWindow({width:400,height:400});
  win.loadFile("index.html");
}

app.whenReady().then(()=>{
  createWindow();
 
  // Connect to the database
  connect().then(ping);

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});
