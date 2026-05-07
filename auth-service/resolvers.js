import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import {users} from "./db.js"

export const resolvers = {
    Query: {
        users(){
            return users;
        },

        me(_, __,context){
            if(!context.user){
                throw new Error("unauthorized");
                
            }

            return context.user
        }
    },
    Mutation: {
        async register(_,args){
            const existinguser = users.find(u => u.username === args.username )

            if(existinguser){
                throw new Error("user already registered")
            }

            const hashedpassword = await bcrypt.hash(args.password,10);

            const user = {
                id : String(users.length +1),
                username: args.username,
                password: hashedpassword,
                role: "USER"
            }
            users.push(user);
            return user;
        },

        async login(_,args){
            const user = users.find(u=> u.username === args.username)
            if(!user){
                throw new Error("user not registered")
            }

            const validpass = await bcrypt.compare(args.password,user.password);
            if(!validpass){
                throw new Error("Invalid password")
            }

            const token  = jwt.sign({
                id: user.id,
                username: user.username,
                role: user.role
            },"Apka_swagatHai", {
                expiresIn: "1d"
            })

            return {
                token,
                user
            }
        },

        User: {

    __resolveReference(ref){

        return users.find(
            u => u.id === ref.id
        );
    }
}
    }
}