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
                const user = new User(input)
                await user.save()
                return user 
            },
        },
        User:{
            async courses(u){
                return await CourseModel.find({user:u.id})
            }
        }
}