import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import db from "./db";

export const authConfig: NextAuthOptions = {
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
        }),
    ],
    callbacks: {
        async signIn(user){
            // console.log(user);
            const userDB = await db.user.findFirst({
                where: {
                    email: String(user.user.email),
                },
                include: {
                    role: true
                }
            });
            
            if(!userDB){
                console.log("Error");
                return Promise.resolve(false);
            }
            
            return Promise.resolve(true);
        }
    }
};