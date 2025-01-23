const express = require('express')
const router = express.Router()
const ownerController = require('../controllers/ownersController')


router.post('/', ownerController.storeOwner)

router.get('/:key', ownerController.show)

module.exports = router