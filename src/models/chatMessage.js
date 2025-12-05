const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: String,
  photo: String, // URL to the photo
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);