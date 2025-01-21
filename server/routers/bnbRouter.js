const express = require('express')
const router = express.Router()
const bnbController = require('../controllers/bnbController')
const ownerController = require('../controllers/ownersController')


router.get('/', bnbController.index)

router.get('/:id', bnbController.show)

router.post('/:id', bnbController.storeProperty)

module.exports = router