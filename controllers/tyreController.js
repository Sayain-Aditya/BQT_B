const Tyre = require('../models/Tyre');
const xlsx = require('xlsx');

const listTyres = async (req, res, next) => {
  try {
    const { q } = req.query;
    const filter = q
      ? { $or: [
          { name: { $regex: q, $options: 'i' } },
          { category: { $regex: q, $options: 'i' } },
        ]}
      : {};
    const tyres = await Tyre.find(filter).sort({ name: 1 });
    res.json(tyres);
  } catch (err) { next(err); }
};

const createTyre = async (req, res, next) => {
  try {
    const tyre = await Tyre.create(req.body);
    res.status(201).json(tyre);
  } catch (err) { next(err); }
};

const updateTyre = async (req, res, next) => {
  try {
    const tyre = await Tyre.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tyre) return res.status(404).json({ message: 'Tyre not found' });
    res.json(tyre);
  } catch (err) { next(err); }
};

const deleteTyre = async (req, res, next) => {
  try {
    const tyre = await Tyre.findByIdAndDelete(req.params.id);
    if (!tyre) return res.status(404).json({ message: 'Tyre not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};

const importTyres = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    const docs = rows
      .filter((r) => r.name && r.price != null)
      .map((r) => ({
        name: String(r.name).trim(),
        price: Number(r.price) || 0,
        category: String(r.category || '').trim(),
      }));

    if (!docs.length) return res.status(400).json({ message: 'No valid rows found. Columns needed: name, price (optional: size, pattern, category)' });

    const inserted = await Tyre.insertMany(docs, { ordered: false });
    res.status(201).json({ inserted: inserted.length, message: `${inserted.length} tyres imported` });
  } catch (err) { next(err); }
};

module.exports = { listTyres, createTyre, updateTyre, deleteTyre, importTyres };
