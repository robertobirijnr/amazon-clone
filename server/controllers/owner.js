const Owner = require('../models/owner');


exports.createOwner = async (req, res) => {
    try {
        let owner = new Owner()

        let {
            name,
            about
        } = req.body;
        owner.name = name,
            owner.about = about,
            owner.photo = req.file.location

        await owner.save()
        res.status(201).json({
            message: true,
            owner
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.getAllOwner = async (req, res) => {
    try {
        let owner = await Owner.find()
        res.status(200).json({
            message: true,
            owner
        })


    } catch (err) {
        res.save(500).json({
            success: false,
            message: ""
        })
    }
}