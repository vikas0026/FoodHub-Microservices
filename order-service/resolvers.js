import { orders } from "./db.js";

export const resolvers = {
    Query: {
        orders: ()=>{
            return orders;
        },
        order: (_, args)=>{
            return orders.find((o) => o.id === args.id);
        }
    },

    Mutation: {
        createOrder:(_,args,context) =>{
            if(!context.user){
        throw new Error("Unauthorized");
        }
        const newOrder = {

        id: String(orders.length + 1),

        userId: context.user.id,

        menuCardId: args.menuCardId,

        quantity: args.quantity
    };
    orders.push(newOrder);

    return newOrder;
        },

        deleteOrder: (_, args, context) => {

        if(!context.user){
        throw new Error("Unauthorized");
        }

        const index = orders.findIndex(
        o => o.id === args.id
        );

        if(index === -1){
        throw new Error("Order not found");
        }

        return orders.splice(index, 1)[0];
    }
    },

  // 🔥 Federation Resolver
    Order: {

    __resolveReference(ref){

        return orders.find(
        o => o.id === ref.id
        );
    }
    }
}