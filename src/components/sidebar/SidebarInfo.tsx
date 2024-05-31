'use client'
import { cn } from '@/src/lib/utils'
import Link from 'next/link'
import {
  FaUtensils,
  FaHome,
  FaComments,
  FaRunning,
  FaBell,
  FaDoorOpen,
  FaMoon,
  FaUsers,
} from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const routes = [
  {
    label: 'Inicio',
    icon: FaHome,
    href: '/home',
    color: 'bg-home-color',
  },
  {
    label: 'Nutrición',
    icon: FaUtensils,
    href: '/nutrition',
    color: 'bg-nutrition-color',
  },
  {
    label: 'Ejercicio',
    icon: FaRunning,
    href: '/exercise',
    color: 'bg-mid-green',
  },
  {
    label: 'Sueño',
    icon: FaMoon,
    href: '/sleep',
    color: 'bg-decoration-sleep-colordark',
  },
  {
    label: 'Chat',
    icon: FaComments,
    href: '/chat',
    color: 'bg-chat-color',
  },
  {
    label: 'Recordatorios',
    icon: FaBell,
    href: '/reminders',
    color: 'bg-reminders-color',
  },
  {
    label: 'Comunidad',
    icon: FaUsers,
    href: '/social',
    color: 'bg-purple-1',
  },
  {
    label: 'Cerrar sesión',
    icon: FaDoorOpen,
    href: '/',
    color: 'bg-mid-red',
  },
]

const SidebarInfo = () => {
  const pathname = usePathname()
  const currentBasePath = pathname.split('/')[1]

  return (
    <div className='flex h-full flex-col space-y-4 bg-side-color py-4 text-white'>
      <div className='flex-1 px-3 py-2'>
        <Link id='Enlace' href='/' className='mb-14 flex items-center pl-3'>
          <div id='Contenedor' className='relative mr-4 h-8 w-8'>
            <h1 className='text-2xl font-bold'>Vita</h1>
          </div>
        </Link>
      </div>

      <div className='space-y-1'>
        {routes.map((route, index) => (
          <Link
            onClick={() => {
              if (route.label === 'Cerrar sesión') {
                signOut()
              }
            }}
            href={route.href}
            key={index}
            className={cn(
              'group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-white/10 hover:text-white',
              {
                [route.color]: currentBasePath === route.href.split('/')[1],
                [`hover:bg-mid-red`]: route.label === 'Cerrar sesión',
              },
            )}
          >
            <div className={cn('mr-3 flex flex-1 items-center')}>
              <route.icon className={cn('mr-3')} size={24} />
              {route.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SidebarInfo
