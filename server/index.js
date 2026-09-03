import express from 'express';
import cors from 'cors';
import {
  getAllEntries,
  getEntryById,
  createEntry,
  updateEntry,
  deleteEntry
} from './data/entries.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// GET /api/entries -> list all infobox entries (id + title only, for an index page)
app.get('/api/entries', (req, res) => {
  const list = getAllEntries().map(({ id, title }) => ({ id, title }));
  res.json(list);
});

// GET /api/entries/:id -> full infobox data for one entry
app.get('/api/entries/:id', (req, res) => {
  const entry = getEntryById(req.params.id);
  if (!entry) return res.status(404).json({ error: 'Entry not found' });
  res.json(entry);
});

// POST /api/entries -> create a new infobox entry
app.post('/api/entries', (req, res) => {
  const { id, title, rows } = req.body || {};
  if (!id || !title || !Array.isArray(rows)) {
    return res.status(400).json({ error: 'id, title, and rows[] are required' });
  }
  if (getEntryById(id)) {
    return res.status(409).json({ error: `Entry with id "${id}" already exists` });
  }
  const entry = createEntry({ id, title, rows });
  res.status(201).json(entry);
});

// PUT /api/entries/:id -> update an existing infobox entry
app.put('/api/entries/:id', (req, res) => {
  const updated = updateEntry(req.params.id, req.body || {});
  if (!updated) return res.status(404).json({ error: 'Entry not found' });
  res.json(updated);
});

// DELETE /api/entries/:id -> remove an infobox entry
app.delete('/api/entries/:id', (req, res) => {
  const ok = deleteEntry(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Entry not found' });
  res.status(204).end();
});

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Infobox API is running. Try /api/entries' });
});

app.listen(PORT, () => {
  console.log(`Infobox API listening on http://localhost:${PORT}`);
});
export default app;
