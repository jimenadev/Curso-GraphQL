const express = require('express')
const { GraphQLSchema, GraphQLObjectType, GraphQLString , graphql, GraphQLInt} = require('graphql')

const courseType = new GraphQLObjectType({
    name: 'Course',
    fields:{
        title: { type: GraphQLString},
        views: { type: GraphQLInt}
    }
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields:{
            message: {
                type: GraphQLString,
                resolve(){
                    return "Hola mundo"
                }
            },
            course:{
                type: courseType,
                resolve(){
                    return { title: 'Curso de graphQL', views: 1000 }
                }
            }
        }
    })
})
const app = express();

app.get('/graphql', function(req, res){
    graphql({schema, source:'{ message, course{ title, views } }', contextValue:{req, res}}).then(r => res.json(r)).catch((r)=>res.json(error))
})

app.listen(8080, function(){
    console.log("Servidor iniciado")
} )