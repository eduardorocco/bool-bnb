const express = require('express')
const router = express.Router()
const bnbController = require('../controllers/bnbController')
const ownerController = require('../controllers/ownersController')

//ROUTE INDEX PROPERTIES localhost:3000/properties
router.get('/', bnbController.index)

//ROUTE SHOW PROPERTY localhost:3000/properties/:id
router.get('/:id', bnbController.show)

//ROUTE POST PROPERTY localhost:3000/properties/:id
router.post('/:id', bnbController.storeProperty)

//ROUTE POST REVIEW localhost:3000/properties/:id/reviews
router.post('/:id/reviews', bnbController.storeReview)

router.patch('/:id/heart', bnbController.modifyHeart)

module.exports = router