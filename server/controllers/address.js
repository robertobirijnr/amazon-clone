const {
    default: axios
} = require("axios");
const Address = require("../models/address");
const user = require("../models/user");


exports.createAddress = async (req, res) => {
    try {
        let address = new Address();
        let {
            country,
            fullName,
            streetName,
            city,
            region,
            phoneNumber,
            deliveryInstruction,
            security
        } = req.body
        address.user = req.decoded._id
        address.country = country;
        address.fullName = fullName;
        address.streetName = streetName,
            address.city = city,
            address.region = region,
            address.phoneNumber = phoneNumber,
            address.deliveryInstruction = deliveryInstruction,
            address.security = security


        await address.save();
        res.json({
            success: true,
            message: "Successfully added an address"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

}

exports.getAddress = async (req, res) => {
    try {
        let address = await Address.find({
            user: req.decoded._id
        })
        if (address) {
            res.json({
                success: true,
                address
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.getAllCountries = async (req, res) => {
    try {
        let response = await axios.get("https://restcountries.eu/rest/v2/all")

        res.json(response.data)
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.updateAddress = async (req, res) => {
    try {
        let foundAddress = await Address.findOne({
            _id: req.params.id
        })
        if (foundAddress) {
            if (req.body.country) foundAddress.country = req.body.country;
            if (req.body.fullName) foundAddress.fullName = req.body.fullName;
            if (req.body.streetName) foundAddress.streetName = req.body.streetName;
            if (req.body.city) foundAddress.city = req.body.city;
            if (req.body.region) foundAddress.region = req.body.region;
            if (req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber;
            if (req.body.deliveryInstruction) foundAddress.deliveryInstruction = req.body.deliveryInstruction;
            if (req.body.security) foundAddress.security = req.body.security

            await foundAddress.save()
            res.json({
                success: true,
                message: "Successfully updated the address"
            })
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


exports.deleteAddress = async (req, res) => {
    try {
        let deletedAddress = await Address.remove({
            user: req.decoded._id,
            _id: req.params.id
        })

        if (deletedAddress) {
            res.json({
                success: true,
                message: "Address has been deleted"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


// Set Default Address
exports.setDefaultAddress = async (req, res) => {
    try {
        const doc = await user.findOneAndUpdate({
            _id: req.decoded._id
        }, {
            $set: {
                address: req.body.id
            }
        })
        if (doc) {
            res.json({
                success: true,
                message: "successfully set this Address"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}