const Task = require('../models/task');
const ActivityHistory = require('../models/ActivityHistory');

exports.getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const userId = req.user.id; // from auth middleware

    const tasks = await Task.find({ assignedTo: userId, status: status });

    // Log activity
    await ActivityHistory.create({
      userId,
      action: `Get tasks by status: ${status}`,
      details: `Fetched ${tasks.length} tasks`
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};