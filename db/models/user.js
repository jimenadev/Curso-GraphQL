const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: String,
    hashedPassword: {
        type: String,
        required: false
    },
    token: String,
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

userSchema.virtual('password')

userSchema.pre('validate', async function(){
    if(this.password == undefined) return

    try{
        this.hashedPassword = await bcrypt.hash(this.password, 10)
        console.log(this.hashedPassword, this.password)
    }catch(err){
        console.log(err)
        throw err
    }
    
})

module.exports = mongoose.model('User', userSchema)