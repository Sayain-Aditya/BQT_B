const mongoose = require('mongoose');

const invoiceItemSchema = new mongoose.Schema({
  description: { type: String, default: '' },
  quantity: { type: Number, default: 1 },
  rate: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
});

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  customerName: { type: String, default: '' },
  companyName: { type: String, default: 'MKS Alliance' },
  date: { type: Date, default: Date.now },
  dueDate: { type: Date },
  items: { type: [invoiceItemSchema], default: [] },
  subtotal: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  notes: { type: String, default: '' },
  status: { type: String, enum: ['draft', 'sent', 'paid'], default: 'draft' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Invoice', invoiceSchema);
