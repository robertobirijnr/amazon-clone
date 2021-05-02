const express = require("express");
const {
    createAddress,
    getAddress,
    getAllCountries,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    getSingleAddress
} = require("../controllers/address");
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')


router.post('/address', verifyToken, createAddress);
router.get('/address', verifyToken, getAddress)
router.get('/address/:id', verifyToken, getSingleAddress)
router.put('/address/:id', verifyToken, updateAddress)
router.delete('/address/:id', verifyToken, deleteAddress)

// Set Default Address
router.put('/address/set/default', verifyToken, setDefaultAddress)


// Get All Countries API
router.get('/countries', getAllCountries)

module.exports = router;