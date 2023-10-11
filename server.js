require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_DEV_URI;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

async function connect() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function ping() {
  try {
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment.");
  } catch (error) {
    console.error("Error pinging MongoDB:", error);
  }
}

module.exports = { connect, ping, client };
