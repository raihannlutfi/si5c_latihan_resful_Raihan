// const mongoose = require('mongoose');

// const alamatSchema = new mongoose.Schema({
//   prodiId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prodi' },
//   createdAt: { type: Date, default: Date.now },
//   jalan: String,
//   kota: String,
// }, { _id: false });



// const mahasiswaSchema = new mongoose.Schema({
//   nama: { type: String, required: [true, 'Andi Pratama'], trim: true },
//   nim: { type: String, required: [true, '2301001'], unique: true, trim: true },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Mahasiswa', mahasiswaSchema);

const mongoose = require('mongoose');

const alamatSchema = new mongoose.Schema({
  prodiId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prodi' },
  jalan: String,
  kota: String,
}, { _id: false });


const mahasiswaSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  nama: {
    type: String,
    required: [true, 'nama wajib diisi'],
    trim: true
  },
  nim: {
    type: String,
    required: [true, 'nim wajib diisi'],
    unique: true,
    trim: true
  },
  prodiId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prodi',
    required: true
  },
  alamat: {
    type: alamatSchema,
    default: () => ({})
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Mahasiswa', mahasiswaSchema);
