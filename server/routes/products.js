const express = require('express')
const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products')
const router = express.Router()
const upload = require('../middlewares/upload-photo')



router.post('/create-product', upload.single("photo"), createProduct)
router.get('/products', getAllProducts)
router.get('/product/:id', getSingleProduct)
router.put('/product/:id',upload.single("photo"), updateProduct)
router.delete('/product/:id',deleteProduct)


module.exports = router