import React, { useEffect, useState } from 'react'
import Image from 'next/image'

/**
 * Props interface for the Decoration component
 */
interface DecorationProps {
  pathname: string // Pathname of the route
}

/**
 * Object containing route information and corresponding images
 */
const routes: Record<string, { image: string; image2: string }> = {
  '/home': {
    image: '/icons/DE_Home.svg',
    image2: '/icons/DE_Home2.svg',
  },
  '/nutrition': {
    image: '/icons/DE_Nutrition.svg',
    image2: '/icons/DE_Nutrition2.svg',
  },
  '/chat': {
    image: '/icons/DE_CHAT.svg',
    image2: '/icons/DE_CHAT2.svg',
  },
  '/exercise': {
    image: '/icons/DE_Exercise.svg',
    image2: '/icons/DE_Exercise2.svg',
  },
  '/reminders': {
    image: '/icons/DE_RECORDATORIO.svg',
    image2: '/icons/DE_RECORDATORIO2.svg',
  },
  '/sleep': {
    image: '/icons/DE_Sleep.svg',
    image2: '/icons/DE_Sleep2.svg',
  },
  // Add more routes as needed
}

/**
 * Loading component to display while images are loading
 */
const Loading = () => <div data-testid='loading'></div>

/**
 * Decoration component responsible for displaying images based on route
 * @param {DecorationProps} props - Props for the Decoration component
 */
const Decoration: React.FC<DecorationProps> = ({ pathname }) => {
  const [images, setImages] = useState<{ image: string; image2: string }>({
    image: '',
    image2: '',
  })
  const [loading, setLoading] = useState(true)

  // Extract the root route from the pathname
  const rootRoute = pathname.split('/')[1]

  useEffect(() => {
    const route = routes[`/${rootRoute}`]
    if (route) {
      setImages(route)
      setLoading(false)
    }
  }, [pathname, rootRoute])

  // Condición para ocultar imágenes en la ruta "/social"
  const hideImages = pathname === '/social' || pathname.startsWith('/social')

  return (
    <>
      {loading && <Loading />}
      {!loading && !hideImages && (
        <>
          <div className='absolute right-0 hidden md:block'>
            <Image src={images.image} alt='Imagen 1' width={180} height={160} />
          </div>
          <div className='absolute right-0 hidden md:block lg:hidden'>
            <Image
              src={images.image2}
              alt='Imagen 2'
              width={140}
              height={120}
            />
          </div>
          <div className='absolute right-0 hidden lg:block'>
            <Image src={images.image} alt='Imagen 1' width={400} height={320} />
          </div>
          <div className='absolute right-0 hidden lg:block'>
            <Image
              src={images.image2}
              alt='Imagen 2'
              width={360}
              height={280}
            />
          </div>
        </>
      )}
    </>
  )
}

export default Decoration
