const express = require('express');
const router = express.Router();
const {
  createProforma,
  listProformas,
  getProforma,
  updateProforma,
  deleteProforma,
  getNextQuotationNumber,
} = require('../controllers/proformaInvoiceController');

router.get('/next', getNextQuotationNumber);
router.route('/').get(listProformas).post(createProforma);
router.route('/:id').get(getProforma).put(updateProforma).delete(deleteProforma);

module.exports = router;
