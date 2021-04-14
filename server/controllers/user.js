const User = require('../models/user')

exports.registerUser =(req,res)=>{
    let user = new User();
    user.name = req.body.name
    user.email = req.body.email
    user.password = req.body.password


    user.save(err=>{
        if(err){
            res.json(err)
        }else{
            res.json('successfully saved')
        }
    })
}