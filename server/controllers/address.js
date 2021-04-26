const Address = require("../models/address")


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
                success:true,
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