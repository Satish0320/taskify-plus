
import Credentials from "next-auth/providers/credentials";
import { db } from "./db";
import bcrypt from "bcrypt"
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers:[
        Credentials({
            name: "Creadentials",
            credentials:{
                email: {label:"Email", type:"email"},
                password:{label:"Password", type:"password"}
            },
            async authorize(credentials){
                const user = await db.user.findUnique({
                    where:{
                        email: credentials?.email
                    }
                });

                if (!user || !credentials?.password) return null;
                const isValid = await bcrypt.compare(credentials.password , user.password)
                if (!isValid) return null;

                return {
                    id: user.id,
                    name: user.name,
                    email:user.email
                }
            }
        })
    ],
    session:{
        strategy: "jwt"
    },
    callbacks:{
        async jwt({token,user}){
            if(user) token.id = user.id;
            return token
        },
        async session({session,token}){
            if(token && session.user){
                session.user.id = token.id as string
            }
            return session
        }
    },
    pages:{
        signIn: "/auth/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
}