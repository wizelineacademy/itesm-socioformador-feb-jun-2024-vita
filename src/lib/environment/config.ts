/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as dotenv from 'dotenv'
import { Resource } from 'sst'

dotenv.config()

const config =
  process.env.NODE_ENV === 'production'
    ? {
        nodeEnv: process.env.NODE_ENV!,
        openApiKey: Resource.OpenApiKey.value,
        facebookId: Resource.FacebookId.value,
        facebookSecret: Resource.FacebookSecret.value,
        googleId: Resource.GoogleId.value,
        googleSecret: Resource.GoogleSecret.value,
        webhookVerifyToken: Resource.WebhookVerifyToken.value,
        graphApiToken: Resource.GraphApiToken.value,
        nextAuthUrl: process.env.NEXTAUTH_URL!,
        nextAuthSecret: process.env.NEXTAUTH_SECRET!,
        nextPublicSecret: process.env.NEXT_PUBLIC_SECRET!,
        geminiApiKey: Resource.GeminiApiKey.value,
      }
    : {
        nodeEnv: process.env.NODE_ENV!,
        databaseUrl: process.env.DATABASE_URL!,
        openApiKey: process.env.OPEN_API_KEY!,
        facebookId: process.env.FACEBOOK_ID!,
        facebookSecret: process.env.FACEBOOK_SECRET!,
        googleId: process.env.GOOGLE_ID!,
        googleSecret: process.env.GOOGLE_SECRET!,
        nextAuthUrl: process.env.NEXTAUTH_URL!,
        nextAuthSecret: process.env.NEXTAUTH_SECRET!,
        nextPublicSecret: process.env.NEXT_PUBLIC_SECRET!,
        databaseName: process.env.DATABASE_NAME!,
        webhookVerifyToken: process.env.WEBHOOK_VERIFY_TOKEN,
        graphApiToken: process.env.GRAPH_API_TOKEN,
        geminiApiKey: process.env.GEMINI_API_KEY,
      }

export default config
