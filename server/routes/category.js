const express = require('express')
const router = express.Router()
const {
    createCategory, getAllCategories
} = require('../controllers/category')



router.post('/create-category', createCategory)
router.get('/categories',getAllCategories)


module.exports = router