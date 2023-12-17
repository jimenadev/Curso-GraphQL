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

userSchema.statics.authenticate = async function({email, password}){
    const user = await this.findOne({email})
    if(!user) throw new Error("Email or password are wrong")

    const result = await bcrypt.compare(password, user.hashedPassword)

    if(!result) throw new Error("Email or password are wrong")

    return user
}

module.exports = mongoose.model('User', userSchema)