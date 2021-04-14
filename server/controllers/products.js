const Product = require('../models/products')


exports.createProduct = async(req,res)=>{
    try {
        let product = new Product()
        product.title = req.body.title
        product.description = req.body.description
        product.photo = req.file.location
        product.stockQuantity = req.body.stockQuantity

        await product.save()
        res.status(201).json({
            success: true,
            message: "successfully created",
            product
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message:err.message
        })
    }
}