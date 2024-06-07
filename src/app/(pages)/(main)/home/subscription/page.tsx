'use client'
import { Plan } from '@/src/data/datatypes/payment'
import { Subscription } from '@/src/data/datatypes/subscription'
import { plans } from '@/src/data/plans'
import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const PricingPage: NextPage = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null)

  const getSubscriptionData = async () => {
    try {
      const res = await axios.get('/api/subscription')
      const data = res.data
      if (data.message === 'No subscription') {
        setSubscription(null)
      } else {
        setSubscription(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const formatExpirationDate = (date: number) => {
    const dateObject = new Date(date * 1000)
    const dateString = dateObject.toLocaleString()
    const dateDay = dateString.split(',')[0]
    return dateDay
  }

  useEffect(() => {
    getSubscriptionData()
  }, [])

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center'>
      <div className='mx-auto max-w-4xl py-8'>
        {!subscription && (
          <h2 className='mb-4 text-center text-2xl font-bold text-color-home6'>
            No tienes una suscripción activa
          </h2>
        )}
        {subscription && (
          <h2 className='mb-4 text-center text-2xl font-bold text-color-home6'>
            Tienes una subscripción de {subscription.plan}
          </h2>
        )}
        {subscription &&
          subscription?.status === 'trialing' &&
          subscription.end && (
            <>
              <h3 className='mx-4 mb-4 text-center text-lg text-black'>
                Actualmente te encuentras en modo de prueba, contrata un plan
                para no perder el acceso a la aplicación
              </h3>
              <h3 className='mx-4 mb-4 text-center text-lg text-black'>
                Tu subscripción expira el{' '}
                {formatExpirationDate(subscription.end)}
              </h3>
            </>
          )}

        <h1 className='mx-4 mb-4 text-center text-2xl font-bold text-color-home6'>
          Contrata una subscripción a Vita
        </h1>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          {plans.map((plan, index) => (
            <PlanCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  )
}

const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => {
  const router = useRouter()

  const processPayment = async () => {
    try {
      const res = await axios.post('/api/stripe/payment', {
        priceId: plan.priceId,
        allowTrial: plan.allowTrial,
      })
      const data = res.data
      router.push(data.url)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex h-full transform flex-col justify-between rounded-md border bg-color-home6 p-4 text-white shadow-md transition duration-300 ease-in-out hover:scale-105'>
      <div>
        <h2 className='mb-2 text-xl font-semibold text-white'>{plan.name}</h2>
        <p className='mb-4 text-gray-300'>${plan.price}/mes</p>
        <ul className='mb-4 list-disc pl-5 text-white'>
          {plan.features.map((feature, index) => (
            <li key={index} className='mb-2'>
              {feature}
            </li>
          ))}
        </ul>
        {plan.name === 'Bienestar Plus' && (
          <h2 className='mb-5 text-lg font-bold'>Pruébalo gratis por 7 días</h2>
        )}
      </div>
      <div className='mt-auto'>
        <button
          className={`w-full transform rounded-md bg-blue-500 px-4 py-2 text-white transition duration-300 hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-400`}
          onClick={processPayment}
        >
          Seleccionar
        </button>
      </div>
    </div>
  )
}

export default PricingPage
