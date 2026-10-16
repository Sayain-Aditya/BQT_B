const express = require('express');
const router = express.Router();
const multer = require('multer');
const { listTyres, createTyre, updateTyre, deleteTyre, importTyres } = require('../controllers/tyreController');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', listTyres);
router.post('/', createTyre);
router.put('/:id', updateTyre);
router.delete('/:id', deleteTyre);
router.post('/import', upload.single('file'), importTyres);

module.exports = router;
