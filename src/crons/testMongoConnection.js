// testMongoConnection.js

const { MongoClient } = require("mongodb");

// Replace this with your MongoDB connection string
const uri = "mongodb+srv://soeb2398_db_user:rprplpKDhWSoam0z@scms-dev.zjx9eam.mongodb.net/?retryWrites=true&w=majority&appName=scms-dev";

async function testConnection() {
  const client = new MongoClient(uri);

  try {
    // Try connecting to the database
    await client.connect();
    console.log("✅ Connected successfully to MongoDB!");

    // Optionally, list available databases
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  } finally {
    // Always close the connection when done
    await client.close();
  }
}

testConnection();
