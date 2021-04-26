const express = require("express");
const {
    createAddress, getAddress
} = require("../controllers/address");
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')


router.post('/address', verifyToken, createAddress);
router.get('/address',verifyToken, getAddress)


module.exports = router;