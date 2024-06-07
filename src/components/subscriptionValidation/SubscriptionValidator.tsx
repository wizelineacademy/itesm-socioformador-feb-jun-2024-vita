'use client'

import { Subscription } from '@/src/data/datatypes/subscription'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

// Define the props interface
interface SubscriptionProps {
  route: string
  children: React.ReactNode
}

const SubscriptionValidation: React.FC<SubscriptionProps> = ({
  route,
  children,
}) => {
  const router = useRouter()

  const restrictedRoutes = [
    '/chat',
    '/reminders',
    '/home/challenge',
    '/home/getChallenge',
    '/home/responseChallenge',
  ]

  const shouldRestrict = restrictedRoutes.some((el) => route.startsWith(el))

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

  useEffect(() => {
    getSubscriptionData()
  }, [])

  useEffect(() => {
    if (
      shouldRestrict &&
      (!subscription || subscription.plan === 'Bienestar Básico')
    ) {
      Swal.fire({
        title: '¡Mejora tu plan!',
        text: 'De momento esta función solo esta disponible para los planes Plus o Total',
        icon: 'info',
        confirmButtonText: 'OK',
      }).then(() => {
        router.replace('/home')
      })
    }
  }, [subscription, route])

  return <>{children}</>
}

export default SubscriptionValidation
