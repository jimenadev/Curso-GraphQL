const express = require('express')
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')

const courses = require('./courses')

const app = express()

const schema = buildSchema(`
    type Course {
        id: ID!
        title: String!
        views: Int
    }

    type Query {
        getCourses: [Course]
        getCourse(id: ID!): Course
    }

    type Mutation {
        addCourse(title: String!, views: Int): Course
    }
`)

const root={
    getCourses: ()=> {
        return courses;
    },
    getCourse: ( {id} ) => {
        return courses.find((course) => id==course.id)
    },
    addCourse({title, views}){
        const id = String(courses.length + 1)
        const course = { id, title, views }
        courses.push(course) 
        return course 
    }
}

app.get('/', function(req, res){
    res.send('Bienvenido')
})

//middleware
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue:root,
    graphiql: true 
}))

app.listen(8000, function(){
    console.log("Servidor iniciado")
})

