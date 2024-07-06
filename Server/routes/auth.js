const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const tokenVerify = require('../middleware/authMiddleware')

router.post('/register', authController.userRegistration)
router.post('/login', authController.userLogin)
router.put('/update', tokenVerify, authController.UpdatePassword)
router.post('/mail', tokenVerify, authController.addMail)
router.get('/allmail', tokenVerify, authController.getAllMails)

module.exports = router