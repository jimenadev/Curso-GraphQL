let courses = []
module.exports = {
        Query:{
            getCourses(obj, {page, limit}){
                if(page !== undefined){
                    return courses.slice(page * limit, (page +1) * limit )
                }
                return courses;
            },
            getCourse: ( {id} ) => {
                return courses.find((course) => id==course.id)
            },
        },
        Mutation:{
            addCourse(obj, {input}){
                const id = String(courses.length + 1)
                const course = { id, ...input }
                courses.push(course) 
                return course 
            },
            updateCourse(obj, {id, input}){
                const courseIndex = courses.findIndex( (course) => id === course.id)
                const course = courses[courseIndex]
        
                const newCourse = Object.assign(course, input)
                course[courseIndex] = newCourse
        
                return newCourse
            },
            deleteCourse(obk, {id}){
                courses = courses.filter((course) => course.id != id)
        
                return{
                    message: `El curso con id ${id} fue eliminado`
                }
            }
        }
}