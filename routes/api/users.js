const express = require('express')
const users = require('../../controllers/users/users.js')
const router = express.Router()

router.get('/users/logout', users.signOutUser)
router.get('/users/current', users.currentUser)

module.exports = router

