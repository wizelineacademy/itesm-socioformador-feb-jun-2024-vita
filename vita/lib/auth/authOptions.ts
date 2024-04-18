import NextAuth, { NextAuthOptions } from "next-auth"
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";


export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 1 * 24 * 60 * 60, // 1 day
    },
    pages: {
        signIn: "/login"
    },
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID!,
            clientSecret: process.env.FACEBOOK_SECRET!
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async(credentials, req) => {

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })

                if(!user){
                    throw new Error( JSON.stringify({ errors: "El correo no se encuentra registrado", status: false }))
                }

                if(!user.password){
                    throw new Error( JSON.stringify({ errors: "Este correo se encuentra registrado con Google o Facebook", status: false }))
                }

                const passwordCorrect = await bcrypt.compare(credentials?.password || "", user?.password || "")

                if(passwordCorrect){
                    return {
                        id: user.id_user.toString(),
                        email: user.email,
                        name: user.name
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
                    const user = await prisma.user.findUnique({
                        where: {
                            email: profile?.email
                        }
                    })

                    if(!user){
                        const user = await prisma.user.create({
                            data: {
                                email: profile?.email!,
                                name: profile?.name ?? ""
                            }
                        })
                    }
                    
                }catch(error){
                    console.log(error)
                }
            }

            return true
        },

        async session({session, user, token}){

            if (session?.user) {
                const dbUser = await prisma.user.findUnique({
                    where: {
                        email: session.user?.email
                    }
                })
                session.user.id = dbUser?.id_user;
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