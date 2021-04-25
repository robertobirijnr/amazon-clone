const Review = require('../models/review')
const Product = require('../models/products')


exports.createReview = async (req, res) => {
    try {
        const review = new Review();
        let {
            headline,
            body,
            rating
        } = req.body
        review.headline = headline;
        review.body = body,
            review.rating = rating,
            review.photo = req.file.location,
            review.user = req.decoded._id,
            review.productID = req.params.productID

            await Product.updateOne({ $push: review._id})
            const savedReview = await review.save();
            if(savedReview){
                res.json({
                    success: true,
                    message: "successfully added review"
                })
            }
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).json({
                msg: "Product not found"
            });
        }
        res.send(500).json("Server Error");
    }
}

exports.getReviews = async (req,res)=>{
    try {
        const ProductReviews = await Review.find({
            productID: req.params.productID
        }).populate('user').exec()
        res.json({
            success: true,
            review: ProductReviews
        })
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).json({
                msg: "Product not found"
            });
        }
        res.send(500).json("Server Error");
    
    }
}