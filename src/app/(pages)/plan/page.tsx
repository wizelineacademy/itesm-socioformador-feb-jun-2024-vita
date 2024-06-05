'use client'
import { NextPage } from 'next'
import Link from 'next/link'

interface Plan {
  name: string
  price: number
  features: string[]
  link: string
}

const plans: Plan[] = [
  {
    name: 'Bienestar Básico',
    price: 199,
    features: [
      '31 rutinas de ejercicio y 300 recetas de comida al mes.',
      '90 detecciones de comida al mes.',
      'Metas de ejercicio, nutrición y sueño.',
      'Blog de salud generado por inteligencia artificial',
      'Red Social para compartir progreso y apoyar a otros.',
      'Perfil Médico',
    ],
    link: 'https://buy.stripe.com/test_5kA4jc54DcqW2zKbII',
  },
  {
    name: 'Bienestar Plus',
    price: 299,
    features: [
      '100 rutinas de ejercicio y 300 recetas de comida al mes.',
      '300 detecciones de comida al mes.',
      'Todos los beneficios del plan básico',
      'Chatbot de salud en la app.',
      'Recordatorios automáticos en Whatsapp.',
      'Retos mensuales e insignias por logros.',
    ],
    link: 'https://buy.stripe.com/test_00g8zs68HbmSb6gdQR',
  },
  {
    name: 'Bienestar Total',
    price: 699,
    features: [
      '300 rutinas de ejercicio y 300 recetas de comida al mes.',
      '1200 detecciones de comida al mes.',
      'Todos los beneficios del plan plus.',
      'Chatbot por Whatsapp.',
      'Acceso prioritario a las nuevas funciones en desarrollo.',
    ],
    link: 'https://buy.stripe.com/test_dR68zsbt1fD8eisdQS',
  },
]

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
        <Link
          className={`w-full transform rounded-md bg-blue-500 px-4 py-2 text-white transition duration-300 hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-400`}
          href={plan.link}
        >
          Seleccionar
        </Link>
      </div>
    </div>
  )
}

export default PricingPage
