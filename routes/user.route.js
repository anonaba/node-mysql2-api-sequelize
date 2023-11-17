const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')

const checkAuthMiddleWare = require('../middleware/check-auth')

router.post('/sign-up', userController.signup)
router.post('/login', userController.login)
router.get('/profile', checkAuthMiddleWare.checkAuth, userController.profile)

module.exports = router
