const { MongoClient } = require('mongodb');
require('dotenv').config();


const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;
const host = process.env.MONGO_HOST || 'localhost';
const port = process.env.MONGO_PORT || '27017';

const auth = user && pass ? `${user}:${pass}@` : '';
const uri = `mongodb://${auth}${host}:${port}/?authSource=admin`;

const dbName = process.env.MONGO_DB_NAME;

let db = null;

async function connectToMongo() {
  if (db) return db;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
    return db;
  } catch (err) {
    console.error('Connection failed:', err);
    throw err;
  }
}

module.exports = connectToMongo;
