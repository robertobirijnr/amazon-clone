const Category = require('../models/category')


exports.createCategory = async(req,res)=>{
    try {
        let category = new Category()
        category.name = req.body.name
        await category.save()
        res.status(201).json({
            success: true,
            message:"category added successfully",
            category
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.getAllCategories = async(req,res)=>{
    try {
       let category = await Category.find()
       res.status(200).json({
           success:true,
           category
       })
    } catch (err) {
        res.status(500).json({
            message: false,
            message: err.message
        })
    }
}