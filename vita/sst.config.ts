/// <reference path="./.sst/platform/config.d.ts" />

export default $config({

  app(input) {
    return {
      name: "vita",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },

  async run() {
    const openApiKey = new sst.Secret("OpenApiKey");
    const facebookId = new sst.Secret("FacebookId");
    const facebookSecret = new sst.Secret("FacebookSecret");
    const googleId = new sst.Secret("GoogleId");
    const googleSecret = new sst.Secret("GoogleSecret");
    const nextAuthUrl = new sst.Secret("NextAuthUrl");
    const nextAuthSecret = new sst.Secret("NextAuthSecret");

    new sst.aws.Nextjs("MyWeb", {
      link: [
        openApiKey,
        facebookId,
        facebookSecret,
        googleId,
        googleSecret,
        nextAuthUrl,
        nextAuthSecret
      ],
      environment: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
        DATABASE_NAME: process.env.DATABASE_NAME!,
        SERVICE_ARN: process.env.SERVICE_ARN!,
        SECRET_ARN: process.env.SECRET_ARN!
      }
    });
  },
});
