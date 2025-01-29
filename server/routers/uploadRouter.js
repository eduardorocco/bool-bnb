const express = require('express')
const router = express.Router()
const uploadController = require('../controllers/uploadController')



//ROUTE UPLOAD IMAGE
router.post('/upload', uploadController.uploadImage)

module.exports = router