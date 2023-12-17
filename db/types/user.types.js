module.exports = `
    type User {
        id: ID!
        email: String!
        hashedPassword: String
        token: String
    }

    input UserInput{
        email: String!
        password: String
    }

    extend type Query {
        getUsers: [User]
        getUser(id: ID!): User
    }

    extend type Mutation {
        signUp(input: UserInput): User
    }`