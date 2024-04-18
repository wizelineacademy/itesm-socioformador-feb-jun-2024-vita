import * as dotenv from "dotenv";
dotenv.config();

const config = {
  nodeEnv: process.env.NODE_ENV!,
  databaseUrl: process.env.DATABASE_URL!,
  openApiKey: process.env.OPEN_API_KEY!,
  facebookId: process.env.FACEBOOK_ID!,
  facebookSecret: process.env.FACEBOOK_SECRET!,
  googleId: process.env.GOOGLE_ID!,
  googleSecret: process.env.GOOGLE_SECRET!,
  nextAuthUrl: process.env.NEXTAUTH_URL!,
  nextAuthSecret: process.env.NEXTAUTH_SECRET!,
  nextPublicSecret: process.env.NEXT_PUBLIC_SECRET! 

};

export default config;