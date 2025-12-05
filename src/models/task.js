const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  gridId: {
    type: String,
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Queued', 'Pending', 'Ongoing', 'On Hold', 'Completed'],
    default: 'Queued'
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  route: [[Number]], // array of [longitude, latitude]
  startTime: Date,
  endTime: Date,
  // We can also store the current location of the FME for this task? Or track in a separate model? Maybe we track the FME's location in the Task when ongoing.
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: [Number]
  }
}, { timestamps: true });

taskSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Task', taskSchema);