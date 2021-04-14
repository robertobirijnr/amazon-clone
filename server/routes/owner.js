const express = require('express')
const router = express.Router()
const { createOwner, getAllOwner} = require('../controllers/owner')
const upload = require('../middlewares/upload-photo.js')



router.post('/create-owner',upload.single('photo'),createOwner)
router.get('/owners',getAllOwner)


module.exports = router