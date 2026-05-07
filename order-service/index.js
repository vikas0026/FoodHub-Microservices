import express from "express";
import cors from "cors";

import jwt from "jsonwebtoken";

import { ApolloServer } from "@apollo/server";

import { expressMiddleware }
from "@apollo/server/express4";

import { buildSubgraphSchema }
from "@apollo/subgraph";

import { typeDefs } from "./schema.js";

import { resolvers } from "./resolvers.js";

const app = express();

app.use(cors());

app.use(express.json());

const server = new ApolloServer({

    schema: buildSubgraphSchema([
    {
        typeDefs,
        resolvers
    }
    ])
});

await server.start();

app.use(

    "/graphql",

    expressMiddleware(server, {

    context: async ({ req }) => {

        const authHeader =
        req.headers.authorization || "";

        if(!authHeader){
        return {};
        }

        try{

        const token =
            authHeader.split(" ")[1];

        const user =
            jwt.verify(
            token,
            "Apka_swagatHai"
            );

        return { user };

        }catch{

        return {};
        }
    }
    })
);

app.listen(4003, () => {

    console.log(
    "Order Service running on port 4003"
    );
});