/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    FacebookId: {
      type: "sst.sst.Secret"
      value: string
    }
    FacebookSecret: {
      type: "sst.sst.Secret"
      value: string
    }
    GeminiApiKey: {
      type: "sst.sst.Secret"
      value: string
    }
    GoogleId: {
      type: "sst.sst.Secret"
      value: string
    }
    GoogleSecret: {
      type: "sst.sst.Secret"
      value: string
    }
    GraphApiToken: {
      type: "sst.sst.Secret"
      value: string
    }
    MyBucket: {
      name: string
      type: "sst.aws.Bucket"
    }
    MyDatabase: {
      clusterArn: string
      database: string
      secretArn: string
      type: "sst.aws.Postgres"
    }
    MyWeb: {
      type: "sst.aws.Nextjs"
      url: string
    }
    OpenApiKey: {
      type: "sst.sst.Secret"
      value: string
    }
    WebhookVerifyToken: {
      type: "sst.sst.Secret"
      value: string
    }
  }
}
export {}