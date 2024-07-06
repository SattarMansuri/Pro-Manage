const express = require('express')
const router = express.Router()
const taskController = require('../controllers/task')
const tokenVerify = require('../middleware/authMiddleware')
const Task = require('../modals/Task')

router.post('/create', tokenVerify, taskController.createTask)
router.get('/taskId/:id', taskController.getTaskById)
router.put('/edit/:id', tokenVerify, taskController.updateTask)
router.put("/zone/:id", tokenVerify, taskController.moveTaskInZone)
router.delete('/delete/:id', tokenVerify, taskController.deleteTask)
router.get('/zone/:zoneName', tokenVerify, taskController.getTaskByZone)
router.get('/analytics', tokenVerify, taskController.getAllAnalytics)

module.exports = router