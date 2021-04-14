const express = require('express')
const { createProduct } = require('../controllers/products')
const router = express.Router()
const upload = require('../middlewares/upload-photo')



router.post('/create-product', upload.single("photo"),createProduct)


module.exports = router