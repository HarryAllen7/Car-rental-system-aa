const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  image: { type: String, default: '' },
  status: { type: String, default: 'available' }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);