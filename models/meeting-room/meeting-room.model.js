const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeetingRoomSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  capacity: { type: Number, required: true },
  datashow: { type: Boolean, required: false },
  status: { type: String, required: false },
  description: { type: String, required: false }
});

module.exports = mongoose.model('MeetingRoom', MeetingRoomSchema);