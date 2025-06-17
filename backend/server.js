import express from 'express';
import pool from './db.js';
import cors from 'cors';
import path from 'path';

const app = express();
const IMAGES_PATH = '/volume1/eclettica-system/ceppi/';
app.use(express.json());
app.use(cors());

app.get('/api/test', (req, res) => {
  res.json({ message: 'API funzionante!' });
});

app.get('/api/articoli/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Articoli WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Articolo non trovato' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use('/images', express.static(IMAGES_PATH));

const PORT = 3001;
app.listen(PORT, () => console.log(`API in ascolto su http://localhost:${PORT}`));
