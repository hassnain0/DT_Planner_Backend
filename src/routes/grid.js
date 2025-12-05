const express = require('express');
const router = express.Router();
const gridController = require('../controllers/gridController');
const middleware = require('../middlewares/authMiddleWare');

// Supervisor routes
router.post('/create', middleware.protect, middleware.authorize('supervisor'), gridController.createGrid);
router.put('/:gridId/assign', middleware.protect, middleware.authorize('supervisor'), gridController.assignGrid);
router.get('/all', middleware.protect, middleware.authorize('supervisor'), gridController.getAllGrids);

// FME routes
router.get('/status/:status', middleware.protect, middleware.authorize('fme'), gridController.getGridsByStatus);
router.put('/:gridId/assignment', middleware.protect, middleware.authorize('fme'), gridController.updateAssignmentStatus);
router.put('/:gridId/start', middleware.protect, middleware.authorize('fme'), gridController.startNavigation);
router.put('/:gridId/status', middleware.protect, middleware.authorize('fme'), gridController.updateTaskStatus);

module.exports = router;