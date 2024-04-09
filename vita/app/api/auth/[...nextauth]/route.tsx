import NextAuth, { NextAuthOptions } from "next-auth"
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/libs/prismadb";
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
                    return null;
                }

                const passwordCorrect = await bcrypt.compare(credentials?.password || "", user?.password || "")

                if(passwordCorrect){
                    return {
                        id: user.id_user.toString(),
                        email: user.email,
                        name: user.name
                    }
                }

                return null;
            }
        }),
    ],
  }
  const handler = NextAuth(authOptions)
  export { handler as GET, handler as POST };
