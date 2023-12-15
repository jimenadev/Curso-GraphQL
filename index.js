const express = require('express')
const { GraphQLSchema, GraphQLObjectType, GraphQLString , graphql} = require('graphql')

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields:{
            message: {
                type: GraphQLString,
                resolve(){
                    return "Hola mundo"
                }
            }
        }
    })
})
const app = express();

app.get('/graphql', function(req, res){
    graphql({schema, source:'{ message }', contextValue:{req, res}}).then(r => res.json(r)).catch((r)=>res.json(error))
})

app.listen(8080, function(){
    console.log("Servidor iniciado")
} )