const express = require('express')
const router = express.Router()
const bnbController = require('../controllers/bnbController')

//index
router.get('/', bnbController.index)



module.exports = router