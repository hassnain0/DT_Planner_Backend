const mongoose = require('mongoose');

const gridSchema = new mongoose.Schema({
  gridId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['queued', 'pending', 'ongoing', 'on_hold', 'completed'],
    default: 'queued'
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  startPoint: {
    type: { type: String, enum: ['Point'] },
    coordinates: [Number]
  },
  route: [[Number]], // Array of [longitude, latitude] pairs
  estimatedTime: Number, // in minutes
  actualStartTime: Date,
  actualEndTime: Date,
  completionPercentage: { type: Number, default: 0 },
  notes: [{
    message: String,
    photos: [String],
    timestamp: { type: Date, default: Date.now },
    type: { type: String, enum: ['roadblock', 'restricted', 'general'] }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create geospatial index
gridSchema.index({ location: '2dsphere' });
gridSchema.index({ startPoint: '2dsphere' });

module.exports = mongoose.model('Grid', gridSchema);