const Course = require('../models/course')
const UserModel = require('../models/user')

module.exports = {
        Query:{
            async getCourses(obj, {page, limit}, context){
               let courses =  Course.find().populate('user')
               
               if(page !== undefined){
                courses =courses.limit(limit).skip((page - 1) * limit)
               }
               return await courses
            },
            async getCourse( obj, {id}) {
                const course = await Course.findById(id)
                return course
            },
        },
        Mutation:{
            async addCourse(obj, {input, user}, context){                
                const userModel = await UserModel.findById({_id:user})
                const course = new Course({...input, user })
                await course.save()
                userModel.courses.push(course)
                await userModel.save()
                return course 
            },
            async updateCourse(obj, {id, input}){
                const course = await Course.findByIdAndUpdate(id, input)
                return course
            },
            async deleteCourse(obj, {id}){
                await Course.deleteOne({_id:id})
        
                return{
                    message: `El curso con id ${id} fue eliminado`
                }
            }
        }
}