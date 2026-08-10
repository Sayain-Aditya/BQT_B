const ProformaInvoice = require('../models/ProformaInvoice');

const normalizeQuotationNumber = (value) => String(value || '').trim();

const buildNextQuotationNumber = async () => {
  const count = await ProformaInvoice.countDocuments();
  let nextNumber = count + 1;
  let next = `QUO-${nextNumber}`;

  while (await ProformaInvoice.exists({ quotationNumber: next })) {
    nextNumber += 1;
    next = `QUO-${nextNumber}`;
  }

  return next;
};

const ensureQuotationNumber = async (payload) => {
  const requested = normalizeQuotationNumber(payload.quotationNumber || payload.refNo);

  if (requested && !(await ProformaInvoice.exists({ quotationNumber: requested }))) {
    return requested;
  }

  return buildNextQuotationNumber();
};

const createProforma = async (req, res, next) => {
  try {
    req.body.quotationNumber = await ensureQuotationNumber(req.body);
    const proforma = await ProformaInvoice.create(req.body);
    res.status(201).json(proforma);
  } catch (error) {
    next(error);
  }
};

const listProformas = async (req, res, next) => {
  try {
    const proformas = await ProformaInvoice.find().sort({ createdAt: -1 });
    res.json(proformas);
  } catch (error) {
    next(error);
  }
};

const getProforma = async (req, res, next) => {
  try {
    const proforma = await ProformaInvoice.findById(req.params.id);
    if (!proforma) return res.status(404).json({ message: 'Proforma invoice not found' });
    res.json(proforma);
  } catch (error) {
    next(error);
  }
};

const updateProforma = async (req, res, next) => {
  try {
    const proforma = await ProformaInvoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!proforma) return res.status(404).json({ message: 'Proforma invoice not found' });
    res.json(proforma);
  } catch (error) {
    next(error);
  }
};

const deleteProforma = async (req, res, next) => {
  try {
    const proforma = await ProformaInvoice.findByIdAndDelete(req.params.id);
    if (!proforma) return res.status(404).json({ message: 'Proforma invoice not found' });
    res.json({ message: 'Proforma invoice deleted' });
  } catch (error) {
    next(error);
  }
};

const getNextQuotationNumber = async (req, res, next) => {
  try {
    const next = await buildNextQuotationNumber();
    res.json({ nextQuotationNumber: next });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProforma,
  listProformas,
  getProforma,
  updateProforma,
  deleteProforma,
  getNextQuotationNumber,
};
