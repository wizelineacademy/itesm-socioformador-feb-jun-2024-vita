'use client'
import { Plan } from '@/src/data/datatypes/payment'
import { plans } from '@/src/data/plans'
import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'

const PricingPage: NextPage = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gradient-custom'>
      <div className='mx-auto max-w-4xl py-8'>
        <h1 className='mb-4 text-center text-3xl font-bold text-white'>
          Planes de Pago
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
    <div className='flex h-full transform flex-col justify-between rounded-md border bg-gray-800 p-4 text-white shadow-md transition duration-300 ease-in-out hover:scale-105'>
      <div>
        <h2 className='mb-2 text-xl font-semibold text-white'>{plan.name}</h2>
        <p className='mb-4 text-gray-400'>${plan.price}/mes</p>
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
