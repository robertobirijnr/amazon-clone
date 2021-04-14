const mongoose = require('mongoose');
const  Schema = mongoose.schema;

const UserSchema = new schema({
    name: String,
    email:{
        type: String,
        unique:true,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    address:{
        type: Schema.types.ObjectId,
        ref:"Address"
    }
})


module.exports = mongoose.model("user",UserSchema);