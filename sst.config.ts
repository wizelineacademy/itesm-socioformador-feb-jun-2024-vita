/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'vita',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    }
  },

  async run() {
    const openApiKey = new sst.Secret('OpenApiKey')
    const facebookId = new sst.Secret('FacebookId')
    const facebookSecret = new sst.Secret('FacebookSecret')
    const googleId = new sst.Secret('GoogleId')
    const googleSecret = new sst.Secret('GoogleSecret')
    const WebhookVerifyToken = new sst.Secret('WebhookVerifyToken')
    const GraphApiToken = new sst.Secret('GraphApiToken')
    const GeminiApiKey = new sst.Secret('GeminiApiKey')
    const StripeSecretKey = new sst.Secret("StripeSecretKey")
    const StripeWebhookSecret = new sst.Secret("StripeWebhookSecret")

    const database = new sst.aws.Postgres('MyDatabase', {
      scaling: {
        min: '0.5 ACU',
        max: '1 ACU',
      },
    })

    const bucket = new sst.aws.Bucket('MyBucket', {
      public: true,
    })

    const blogCron = new sst.aws.Cron('MyCronJob', {
      schedule: 'cron(0 6 * * ? *)',
      job: {
        handler: 'src/cron_functions/blog.handler',
        timeout: '60 seconds'
      }
    })

    const remindersCron = new sst.aws.Cron('RemindersJob', {
      schedule: 'rate(30 minutes)',
      job: {
        handler: 'src/cron_functions/reminders.handler',
        timeout: '60 seconds'
      }
    })

    new sst.aws.Nextjs('MyWeb', {
      link: [
        bucket,
        database,
        openApiKey,
        facebookId,
        facebookSecret,
        googleId,
        googleSecret,
        WebhookVerifyToken,
        GraphApiToken,
        GeminiApiKey,
        StripeSecretKey,
        StripeWebhookSecret
      ],
      environment: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
      },
    })
  },
})
