const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  concertId: { type: String, required: true, ref: 'Client' },
});

module.exports = mongoose.model('Workshop', workshopSchema);
