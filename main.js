const {MongoClient} = require('mongodb');

async function startserver(){
    while(true){
    const username="linustrahair";
    const password="knuckles";
    const cluster="cluster0.5xyhlnf.mongodb.net";
    const uri =`mongodb+srv://${username}:${password}@${cluster}/test?retryWrites=true&w=majority`;
    try{const client=new MongoClient(uri);
    await client.connect();
    await run(client);
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