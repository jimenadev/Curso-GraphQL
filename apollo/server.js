const { ApolloServer } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')
const courses = require('./courses')

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
            }
        },
        Mutation:{
            addCourse(obj, {input}){
                const id = String(courses.length + 1)
                const course = { id, ...input }
                courses.push(course) 
                return course 
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
