import gql from "graphql-tag";
export const typeDefs= gql`
    type menuCard @key(fields: "id"){
        id: ID!,
        title: String!,
        price: Int!
    }

    type Query{
        menuCards: [menuCard]
        menuCard(id: ID!) : menuCard
    }

    type Mutation{
        addmenu(title: String!, price: Int!): menuCard
        deletemenu(id: ID!) : menuCard
    }
`