require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

const express = require('express');
const cors = require('cors');

const logger = require('./middlewares/logger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const mahasiswaRoutes = require('./routes/mahasiswaRoutes');
const fakultasRoutes = require('./routes/fakultasRoutes');
const prodiRoutes = require('./routes/prodiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware global ----------
app.use(logger);
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
function cekApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: 'API key tidak valid' });
  }

  next();
}

function errorHttp(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

app.get('/', (req, res) => {
  res.send('Server Express.js berjalan!');
});
app.use(express.json());

// ---------- Route dasar ----------
app.get('/', (req, res) => {
  res.send('Server Express.js berjalan!');
});

// ---------- Route per modul ----------
app.use('/mahasiswa', mahasiswaRoutes);
app.use('/fakultas', fakultasRoutes);
app.use('/prodi', prodiRoutes);

// GET /mahasiswa/:id -> menampilkan satu data berdasarkan id
app.get('/mahasiswa/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const data = mahasiswa.find((m) => m.id === id);

  if (!data) return next(errorHttp(404, 'Data tidak ditemukan'));
  res.json(data);
});

// POST /mahasiswa
// Body: { "nama": "Citra", "jurusan": "Sistem Informasi" }
app.post('/mahasiswa', cekApiKey, (req, res, next) => {
  const { nama, jurusan } = req.body;

  if (!nama || !jurusan) {
    return next(errorHttp(400, 'nama dan jurusan wajib diisi'));
  }

  const baru = { id: nextId++, nama, jurusan };
  mahasiswa.push(baru);
  res.status(201).json(baru);
});

// PUT /mahasiswa/2
// Body: { "nama": "Budi Santoso", "jurusan": "Informatika" }
app.put('/mahasiswa/:id', cekApiKey, (req, res, next) => {
  const id = parseInt(req.params.id);
  const index = mahasiswa.findIndex((m) => m.id === id);

  if (index === -1) return next(errorHttp(404, 'Data tidak ditemukan'));

  mahasiswa[index] = { ...mahasiswa[index], ...req.body, id };
  res.json(mahasiswa[index]);
});

// DELETE /mahasiswa/2
app.delete('/mahasiswa/:id', cekApiKey, (req, res) => {
  const id = parseInt(req.params.id);
  const index = mahasiswa.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Data tidak ditemukan' });
  }

  mahasiswa.splice(index, 1);
  res.status(204).send();
});

// ---------- Handler 404 dan error handler (paling bawah) ----------
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
