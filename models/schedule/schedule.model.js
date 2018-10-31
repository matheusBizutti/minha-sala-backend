const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  roomId: { type: String, required: true },
  scheduleTime: { type: String, required: true },
  scheduleHourInit: { type: String, required: true },
  scheduleHourEnd: { type: String, required: true },
  userEmail: { type: String, required: true },
  department: { type: String, required: false },
  status: { type: String, required: false }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);