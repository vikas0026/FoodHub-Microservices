import gql from "graphql-tag"
export const typeDefs = gql`
type User @key(fields: "id"){
    id: ID!
    username: String!
    role: String!
}
type AuthPayload{
    token: String!
    user: User!
}

type Query{
    users: [User]
    me: User
}
type Mutation{
    register(
        username: String!
        password: String!
    ): User

    login(
        username: String!
        password: String!
    ): AuthPayload

}
`