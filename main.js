const {MongoClient} = require('mongodb');
let package=require('./package.json');

async function startserver(){
    while(true){
    const username=package.server.username;
    const password=package.server.password;
    const cluster=package.server.cluster;
    const uri =`mongodb+srv://${username}:${password}@${cluster}/test?retryWrites=true&w=majority`;
    try{global.client=new MongoClient(uri);
    await global.client.connect();
    await run(global.client);
    }
    catch(error){
        console.log("\n incorrect settings re-enter");
    }
    finally{
        break;
    }
    return "hello World";
}

}
async function run(client){
    console.log("correct");
    return "hello World";
}


const {app,BrowserWindow}=require('electron');
const createWindow=()=>{
    const win =new BrowserWindow({width:400,height:400});
    win.loadFile("index.html");
}
app.whenReady().then(()=>{
    createWindow();
    startserver();
    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })