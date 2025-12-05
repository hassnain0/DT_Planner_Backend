const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleWare');

// All routes below require authentication
router.use(authMiddleware);

// Get tasks by status (for the logged-in FME)
router.get('/:status', taskController.getTasksByStatus);

// Accept a task (move from Queued to Pending)
router.post('/:taskId/accept', taskController.acceptTask);

router.post('/:taskId/reject', taskController.rejectTask);

// Start navigation (move from Pending to Ongoing)
router.post('/:taskId/start', taskController.startTask);

// Update task status (On Hold, Stop, Complete)
router.put('/:taskId/status', taskController.updateTaskStatus);

// Get all tasks for the FME for the route map (with locations and statuses)
router.get('/map/all', taskController.getTasksForMap);

// Get tasks for calendar (by date range)
router.get('/calendar', taskController.getTasksByDateRange);

module.exports = router;