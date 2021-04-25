const express = require('express')
const {
    createReview, getReviews
} = require('../controllers/review')

const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')
const upload = require('../middlewares/upload-photo')


router.post('/review/:productID',
    verifyToken, upload.single('photo'), createReview)

router.get('/reviews/:productID',getReviews)    

module.exports = router