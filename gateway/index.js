import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import { ApolloGateway } from "@apollo/gateway";

const app = express();

app.use(cors)
app.use(express.json());

const gateway = new ApolloGateway({
    serviceList: [
        {
            name: "auth",
            url: "http://localhost:4001/graphql"
        },
        {
            name: "menu",
            url: "http://localhost:4002/graphql"
        },
        {
            name:"order",
            url: "http://localhost:4003/graphql"
        }
    ]
})

const server = new ApolloServer({
    gateway,
    subscriptions: false
});

await server.start();

app.use(
    "/graphql",
    expressMiddleware(server)
)

app.listen(4004, ()=>{
    console.log("Gateway running on port 4004");
    
})