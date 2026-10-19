const mongoose = require('mongoose');

const mahasiswaSchema = new mongoose.Schema({
  nama: { type: String, required: [true, 'Andi Pratama'], trim: true },
  nim: { type: String, required: [true, '2301001'], unique: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Mahasiswa', mahasiswaSchema);