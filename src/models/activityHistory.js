const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  gridId: { type: mongoose.Schema.Types.ObjectId, ref: 'Grid' },
  details: Object,
  timestamp: { type: Date, default: Date.now },
  location: {
    type: { type: String, enum: ['Point'] },
    coordinates: [Number]
  }
});

module.exports = mongoose.model('Activity', activitySchema);