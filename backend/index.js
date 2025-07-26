const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectToMongo = require('./mongo');

const app = express();
app.use(cors());

app.get('/employees', async (req, res) => {
  try {
    const db = await connectToMongo();
    const records = await db.collection('employees').find({}).toArray();
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data from MongoDB' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
