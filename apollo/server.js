const { ApolloServer } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')
let courses = require('./courses')

const typeDefs = `
    type Course {
        id: ID!
        title: String!
        views: Int
    }

    type Alert{
        message: String
    }

    input CourseInput{
        title: String!
        views: Int
        description: String
    }

    type Query {
        getCourses(page: Int, limit: Int = 1): [Course]
        getCourse(id: ID!): Course
    }

    type Mutation {
        addCourse(input: CourseInput): Course
        updateCourse(id: ID!, input: CourseInput): Course
        deleteCourse(id: ID!): Alert
    }`

const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: {
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
})

const server = new ApolloServer({
    schema: schema
})

server.listen({ port: 3000 }).then(({url})=>{
    console.log(`Apollo Server on  ${url}`)
})
