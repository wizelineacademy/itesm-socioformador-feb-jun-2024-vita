import { Plan } from './datatypes/payment'

export const plans: Plan[] = [
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
    priceId: 'price_1PODCEA5dyQt5UTQT1A5yBVQ',
    allowTrial: false,
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
    priceId: 'price_1PODQFA5dyQt5UTQ9ejvVNjG',
    allowTrial: true,
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
    priceId: 'price_1PODRUA5dyQt5UTQqsDYIfuQ',
    allowTrial: false,
  },
]
