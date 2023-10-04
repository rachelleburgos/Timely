const {MongoClient} = require('mongodb');

async function main(){
    while(true){
    console.log("\n enter username:");
    const username=prompt();
    console.log("\n enter password:");
    const password=prompt();
    console.log("\n enter cluster:");
    const cluster=prompt();
    const uri =`mongodb+srv://${username}:${password}@${cluster}/test?retryWrites=true&w=majority`;
    try{const client=new MongoClient(uri);
    await client.connect();
    await run(client);
    }
    catch(error){
        console.log("\n incorrect settings re-enter");
    }
    finally{
        await client.close();
        break;
    }
}

}
async function run(client){
    console.log("correct");
}

main();