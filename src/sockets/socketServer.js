const Grid = require('../models/grid');

socket.on('sendMessage', async (data) => {
    const { gridId, message, userId, photos, type } = data;
  
    try {
      // Save to database
      const grid = await Grid.findById(gridId);
      if (!grid) {
        return socket.emit('error', 'Grid not found');
      }
  
      const note = {
        message,
        photos: photos || [],
        type: type || 'general',
        timestamp: new Date()
      };
  
      grid.notes.push(note);
      await grid.save();
  
      // Broadcast to grid room
      io.to(`grid_${gridId}`).emit('newMessage', {
        userId,
        note, // Send the entire note object (with _id)
        timestamp: note.timestamp
      });
  
    } catch (error) {
      console.error(error);
      socket.emit('error', 'Failed to send message');
    }
  });