const { ApolloServer } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')
const courses = require('./courses')

const server = new ApolloServer({
    schema: null
})


const typeDefs = buildSchema(`
    type Course {
        id: ID!
        title: String!
        views: Int
    }

    type Query {
        getCourses(page: Int, limit: Int = 1): [Course]
    }
`)

const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers
})

server.listen().then(({url})=>{
    console.log(`Servidor iniciado en ${url}`)
})
