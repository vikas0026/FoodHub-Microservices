import { MenuCard } from "./db.js";

export const resolvers = {

    Query: {
        menuCards:() => MenuCard,
        menuCard: (_, args)=>{
            console.log(args);
            
            return MenuCard.find(m => m.id === args.id);
        }
    },

    Mutation: {
        addmenu: (_,agrs,context)=>{
            //Authorization
            if (!context.user || context.user.role !== "ADMIN") {
        throw new Error("Not authorized");
    }
    const newmenu = {
        id: String(MenuCard.length+1),
        title: args.title,
        price: args.price
    }
    MenuCard.push(newmenu);
    return newmenu
        },

        deletemenu: (_, args,context)=>{
            if(!context.user || context.user.role !== "ADMIN"){
                throw new Error("not authorized to perform delete operation")
            }

            const index = MenuCard.findIndex(g => g.id === args.id);

        if (index === -1) {
        throw new Error("Game not found");
        }

        return MenuCard.splice(index, 1)[0];
        },

        //fedration resolver
        MenuCard: {
            _resolveReference(ref){
                return MenuCard.find(m => m.id === ref.id)
            }
        }
        
    }
}
