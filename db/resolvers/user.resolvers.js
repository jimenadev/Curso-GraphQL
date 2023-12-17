const UserModel = require('../models/user')
const CourseModel = require('../models/course')

module.exports = {
        Query:{
            async getUsers(){
                return await UserModel.find()
            },
            async getUser(obj, {id}){
                return await UserModel.findById(id)
            }
        },
        Mutation:{
            async signUp(obj, {input}){
                const user = new UserModel(input)
                await user.save()
                return user 
            },
            async logIn(obj, {input}){
                try{
                    const user = UserModel.authenticate(input)
                    return user
                }catch(err){
                    console.log(err)
                    return null
                }
            }
        },
        User:{
            async courses(u){
                return await CourseModel.find({user:u.id})
            }
        }
}