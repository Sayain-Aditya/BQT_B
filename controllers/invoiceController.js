const Invoice = require('../models/Invoice');

const buildNextInvoiceNumber = async () => {
  const count = await Invoice.countDocuments();
  return `INV-${count + 1}`;
};

const createInvoice = async (req, res, next) => {
  try {
    if (!req.body.invoiceNumber) {
      req.body.invoiceNumber = await buildNextInvoiceNumber();
    }
    const invoice = await Invoice.create(req.body);
    res.status(201).json(invoice);
  } catch (error) {
    next(error);
  }
};

const listInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    next(error);
  }
};

const getInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json(invoice);
  } catch (error) {
    next(error);
  }
};

const updateInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json(invoice);
  } catch (error) {
    next(error);
  }
};

const deleteInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json({ message: 'Invoice deleted' });
  } catch (error) {
    next(error);
  }
};

const getNextInvoiceNumber = async (req, res, next) => {
  try {
    const next = await buildNextInvoiceNumber();
    res.json({ nextInvoiceNumber: next });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInvoice,
  listInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice,
  getNextInvoiceNumber,
};
