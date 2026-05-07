import gql from "graphql-tag";
export const typeDefs = gql`
    type Order @key(fields: "id"){
        id: ID!
        userId: ID!
        menuCardId: ID!
        quantity: Int!
    }

    type Query {
        orders: [Order]
        order(id: ID!): Order
    }

    type Mutation{
        createOrder(
        menuCardId: ID!
        quantity: Int!
        ): Order

    deleteOrder(id: ID!): Order
    }
`