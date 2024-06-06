import Stripe from 'stripe'
import config from '../environment/config'

export const stripe = new Stripe(config.stripeSecretKey, {
  apiVersion: '2024-04-10',
  typescript: true,
})
