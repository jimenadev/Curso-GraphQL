const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    hashedPassword: {
        type: String,
        required: false
    },
    token: String
})

module.exports = mongoose.model('User', userSchema)