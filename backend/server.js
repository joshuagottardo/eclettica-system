import express from 'express';
import pool from './db.js';
import cors from 'cors';
import path from 'path';

const app = express();
const IMAGES_PATH = '/volume1/eclettica-system/ceppi/';
app.use(express.json());
app.use(cors());

// Serve static files from the images directory
app.use('/images', express.static(IMAGES_PATH));

// Serve the React app (test purpose)
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funzionante!' });
});

// Select all names from the 'materiale' table
app.get('/api/materiali', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT nome FROM materiale ORDER BY nome ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Select all articles from the 'articolo' table
app.get('/api/articoli', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        articolo.id,
        articolo.nome,
        articolo.tipo,
        articolo.numero_pezzi,
        articolo.altezza,
        articolo.punta,
        articolo.tacco,
        articolo.accessori,
        azienda.nome AS nome_azienda,
        azienda.brand AS brand_azienda
      FROM articolo
      LEFT JOIN azienda ON articolo.id_azienda = azienda.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Select all companies from the 'azienda' table
app.get('/api/aziende', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, brand FROM azienda ORDER BY nome ASC');
    res.json(rows);
  } catch (err) {
    console.error("Errore durante il recupero delle aziende:", err);
    res.status(500).json({ error: 'Errore nel recupero delle aziende' });
  }
});

// Get details of a specific article by ID
app.get("/api/articoli/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await pool.query(`
      SELECT 
        a.id,
        a.nome,
        a.tipo,
        a.numero_pezzi,
        a.altezza,
        a.punta,
        a.tacco,
        a.accessori,
        az.nome AS nome_azienda,
        az.brand AS brand_azienda
      FROM articolo a
      LEFT JOIN azienda az ON a.id_azienda = az.id
      WHERE a.id = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Articolo non trovato" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore nel caricamento dettagli articolo" });
  }
});



const PORT = 3001;
app.listen(PORT, () => console.log(`API in ascolto su http://localhost:${PORT}`));
