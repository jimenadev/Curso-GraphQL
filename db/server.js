const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/graphql_db_course');

const typeDefs = gql`
    type Alert {
        message: String
    }

    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }
`;

const resolvers = {
  // Aquí puedes agregar tus resolvers para manejar las consultas y mutaciones
};

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const app = express();
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 8080 }, () => {
    console.log(`Servidor iniciado en http://localhost:8080${server.graphqlPath}`);
  });
}

startServer().catch((error) => {
  console.error('Error al iniciar el servidor Apollo:', error);
});