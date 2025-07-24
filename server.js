require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sql = require('mssql');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,              // Set to true if SQL Server requires encryption
    enableArithAbort: true,
    multipleStatements: true     // Optional: only if you need it
  }
};

// Healthcheck route
app.get('/api/healthcheck', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query`SELECT GETDATE() AS time`;
    res.json({ success: true, time: result.recordset[0].time });
  } catch (err) {
    console.error('DB connection failed:', err);
    res.status(500).json({ success: false, error: 'Database connection failed' });
  }
});

// Example route to get data from a real table
app.get('/api/example', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query`SELECT TOP 10 * FROM members`;
    res.json(result.recordset);
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({ error: 'Query failed' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));