'use client'
import { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'

interface Plan {
  name: string
  price: number
  features: string[]
}

const plans: Plan[] = [
  {
    name: 'Bienestar Básico',
    price: 199,
    features: [
      '31 rutinas de ejercicio y 300 recetas de comida al mes.',
      'Metas de ejercicio, nutrición y sueño.',
      '90 detecciones de comida al mes.',
      'Blog de salud generado por inteligencia artificial',
      'Red Social para compartir progreso y apoyar a otros.',
      'Perfil Médico',
    ],
  },
  {
    name: 'Bienestar Plus',
    price: 299,
    features: [
      '100 rutinas de ejercicio y 300 recetas de comida al mes.',
      'Metas de ejercicio, nutrición y sueño.',
      '300 detecciones de comida al mes.',
      'Chatbot de salud en la aplicación web.',
      'Recordatorios automáticos.',
      'Blog de salud generado por inteligencia artificial.',
      'Red Social para compartir progreso y apoyar a otros.',
      'Perfil Médico.',
      'Puntos y logros.',
    ],
  },
  {
    name: 'Bienestar Total',
    price: 699,
    features: [
      '300 rutinas de ejercicio y 300 recetas de comida al mes.',
      'Metas de ejercicio, nutrición y sueño.',
      '1200 detecciones de comida al mes.',
      'Chatbot de Salud en WhatsApp y la aplicación web.',
      'Recordatorios automáticos.',
      'Blog de salud generado por inteligencia artificial.',
      'Red Social para compartir progreso y apoyar a otros.',
      'Perfil Médico.',
      'Mapa de expertos en salud.',
      'Reconocimiento de voz para chats de WhatsApp y la aplicación web.',
      'Puntos y logros.',
    ],
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
  const router = useRouter()
  const [selected, setSelected] = useState(false)

  const handleSelectPlan = () => {
    setSelected(!selected)

    router.push(`/home/?selectedPlan=${plan.name}`)
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
      </div>
      <div className='mt-auto'>
        <button
          className={`rounded-md bg-blue-500 px-4 py-2 text-white focus:outline-none focus:ring focus:ring-${selected ? 'green' : 'blue'}-400 hover:bg-${selected ? 'green' : 'blue'}-600 w-full transform transition duration-300 hover:scale-105`}
          onClick={handleSelectPlan}
        >
          Seleccionar
        </button>
      </div>
    </div>
  )
}

export default PricingPage
