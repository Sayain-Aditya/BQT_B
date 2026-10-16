const mongoose = require('mongoose');

const tyreSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, default: 0 },
  category: { type: String, default: '', trim: true },
}, { timestamps: true });

tyreSchema.index({ name: 'text', category: 'text' });

module.exports = mongoose.model('Tyre', tyreSchema);
