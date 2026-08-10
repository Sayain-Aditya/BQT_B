const express = require('express');
const router = express.Router();
const {
  createInvoice,
  listInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice,
  getNextInvoiceNumber,
} = require('../controllers/invoiceController');

router.get('/next', getNextInvoiceNumber);
router.route('/').get(listInvoices).post(createInvoice);
router.route('/:id').get(getInvoice).put(updateInvoice).delete(deleteInvoice);

module.exports = router;
