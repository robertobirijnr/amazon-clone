const Product = require('../models/products')


exports.createProduct = async (req, res) => {
    try {
        let product = new Product()
        let {
            title,
            description,
            stockQuantity,
            price,
            category,
            owner
        } = req.body;
        product.title = title
        product.description = description
        product.photo = req.file.location
        product.stockQuantity = stockQuantity
        product.price = price
        product.category = category
        product.owner = owner

        await product.save()
        res.status(201).json({
            success: true,
            message: "successfully created",
            product
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        let product = await Product.find().populate('category owner').exec()
        res.status(200).json({
            success: true,
            "Total Products": product.length,
            product
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.getSingleProduct = async (req, res) => {
    try {
        let {
            id
        } = req.params
        let product = await Product.findOne({
                _id: id
            })
            .populate('category owner').exec()
        if (!product) {
            res.status(404).json({
                success: false,
                message: `there is no product with ${id}`
            })
        } else {
            res.status(200).json({
                message: true,
                product
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        let
            id = req.params._id;
        let product = await Product.findOneAndUpdate(id, {
            $set: {
                title: req.body.title,
                price: req.body.price,
                category: req.body.category,
                photo: req.file.location,
                description: req.body.description,
                owner: req.body.owner
            }
        }, {
            upsert: true
        })
        res.json({
            success: true,
            'updated Product': product
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        let {
            id
        } = req.params;
        let product = await Product.findOneAndDelete({
            _id: id
        })
        if (product) {
            res.json({
                status: true,
                message: "successfully deleted"
            })
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}