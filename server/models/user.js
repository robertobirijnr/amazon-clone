const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email format'],
    },
    password: {
        type: String,
        required: true,
        match: [/(?=.{8,})/, 'The string must be eight characters or longer']
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: "Address"
    }
})


UserSchema.pre("save", function (next) {
    const user = this;

    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (password, next) {
    let user = this;

    return bcrypt.compareSync(password,user.password);
}

module.exports = mongoose.model("user", UserSchema);