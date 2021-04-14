const Product = require('../models/products')


exports.createProduct = async(req,res)=>{
    try {
        let product = new Product()
        let {title,description,stockQuantity} = req.body;
        product.title = title
        product.description = description
        product.photo = req.file.location
        product.stockQuantity = stockQuantity

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