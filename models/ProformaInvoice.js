const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  description: { type: String, default: '' },
  qty: { type: Number, default: 1 },
  unitPrice: { type: Number, default: 0 },
  finalPrice: { type: String, default: '' },
  priceSource: { type: String, default: 'unit' },
}, { _id: false });

const proformaInvoiceSchema = new mongoose.Schema({
  quotationNumber: { type: String, default: '', unique: true, sparse: true },
  refNo: { type: String, default: '' },
  date: { type: String, default: '' },
  logo: { type: String, default: '' },

  // Customer
  to: {
    name: { type: String, default: '' },
    address: { type: String, default: '' },
    mob: { type: String, default: '' },
    email: { type: String, default: '' },
    gst: { type: String, default: '' },
    state: { type: String, default: '' },
    stateCode: { type: String, default: '' },
  },
  shipTo: { type: String, default: '' },
  hpn: { type: String, default: '' },

  // Products
  items: { type: [itemSchema], default: [] },

  // Tax
  gstPercent: { type: Number, default: 18 },
  includeGst: { type: Boolean, default: true },

  // Totals
  roundedTotal: { type: String, default: '' },
  totals: { type: mongoose.Schema.Types.Mixed },
  amountInWords: { type: String, default: '' },

  // Terms & Bank
  otherTerms: { type: String, default: '' },
  paymentTerms: { type: String, default: '' },
  validity: { type: String, default: '' },

  // Footer
  footerCompany: { type: String, default: '' },
  footerAddress: { type: String, default: '' },
  footerGst: { type: String, default: '' },
  footerEmail: { type: String, default: '' },
  footerMobile: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('ProformaInvoice', proformaInvoiceSchema);
