import NextAuth, { NextAuthOptions } from "next-auth"
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "@/app/db/drizzle";
import { user } from "@/app/db/schema/schema";
import { eq } from "drizzle-orm";
import config from "@/lib/environment/config";



export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 1 * 24 * 60 * 60, // 1 day
    },
    pages: {
        signIn: "/login"
    },
    secret: config.nextPublicSecret,
    providers: [
        FacebookProvider({
            clientId: config.facebookId,
            clientSecret: config.facebookSecret
        }),
        GoogleProvider({
            clientId: config.googleId,
            clientSecret: config.googleSecret
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async(credentials, req) => {

                const existingUser = await db.select()
                .from(user)
                .where(eq(user.email, credentials?.email ?? ""))
                .limit(1)


                if(existingUser.length === 0){
                    throw new Error( JSON.stringify({ errors: "El correo no se encuentra registrado", status: false }))
                }

                if(!existingUser[0].password){
                    throw new Error( JSON.stringify({ errors: "Este correo se encuentra registrado con Google o Facebook", status: false }))
                }

                const passwordCorrect = await bcrypt.compare(credentials?.password || "", existingUser[0].password || "")

                if(passwordCorrect){
                    return {
                        id: existingUser[0].idUser.toString(),
                        email: existingUser[0].email,
                        name: existingUser[0].name
                    }
                }

                throw new Error( JSON.stringify({ errors: "El correo y contraseña son incorrectos", status: false }));
            }
        }),
    ],
    callbacks: {
        async signIn({account, profile}){ //register users if they do not exist in the database
            if(account?.provider === "google" || account?.provider === "facebook"){

                try {

                    const existingUser = await db.select()
                    .from(user)
                    .where(eq(user.email, profile?.email ?? ""))
                    .limit(1) 

                    if(existingUser.length === 0){
                        const res = await db.insert(user).values({
                            email: profile?.email!,
                            name: profile?.name ?? ""
                        }) 
                    }
                    
                }catch(error){
                    console.log(error)
                }
            }

            return true
        },

        async session({session, token}){

            if (session?.user) {
    
                const dbUser = await db.select()
                    .from(user)
                    .where(eq(user.email, session.user?.email ?? ""))
                    .limit(1) 

                if(dbUser.length > 0){
                    session.user.id = dbUser[0].idUser;
                }

              }
              return session;
        },

        // async jwt({user, token}){
        //     if(user){
        //         token.uid =  user.id;
        //     }
        //     return token;
        // }
    }
}