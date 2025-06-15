const bcrypt = require("bcryptjs");
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,

    },
    isAdmin: {
        type: Boolean,
        default: false
    }

})

// Login in schema created function 
userSchema.methods.passwordCompare = function () {
    return bcrypt.comparePassword(password, this.password)
}
// Json web Token
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userID: this._ID.toStrign(),
            email: this.email,
            isAdmin: isAdmin
        }, process.env.JWT_SECRET_KEY, { expiresIN: "30d" })
    } catch (error) {
        console.log(error)
    }
}

const User = new mongoose.model('User', userSchema)
module.exports = User