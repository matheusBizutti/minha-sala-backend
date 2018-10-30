const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MetricsSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  api: { type: String, required: true },
  httpStatusCode: { type: String, required: false },
  date: { type: String, required: false },
  user: { type: String, required: false }
});

module.exports = mongoose.model('Metrics', MetricsSchema);