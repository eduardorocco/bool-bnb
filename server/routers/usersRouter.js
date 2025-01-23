const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')


router.post('/', usersController.storeOwner)

router.get('/:key', usersController.show)

module.exports = router