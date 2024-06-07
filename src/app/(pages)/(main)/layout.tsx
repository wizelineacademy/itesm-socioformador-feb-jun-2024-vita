'use client'

import { Inter } from 'next/font/google'

import SidebarInfo from '@/src/components/sidebar/SidebarInfo'
import MobileSidebar from '@/src/components/sidebar/MobileSidebar'
import Decoration from '@/src/components/Decoration'
import { usePathname } from 'next/navigation'
import { RecipesContextProvider } from '@/src/context/ingredients'
import NextAuthProvider from '@/src/context/authprovider'
import { ExercisesContextProvider } from '@/src/context/exercises'
import MainContainer from '@/src/components/layoutSocial/MainContainer'
import { AutoevaluationContextProvider } from '@/src/context/autoevaluation'
import SubscriptionValidation from '@/src/components/subscriptionValidation/SubscriptionValidator'

// Define font settings

const interFont = Inter({
  display: 'swap',
  subsets: ['latin'],
})

// Define routes and their corresponding background colors
const routes: { [key: string]: string } = {
  '/home': 'bg-home-background',
  '/nutrition': 'bg-nutrition-background',
  '/chat': 'bg-chat-background',
  '/exercise': 'bg-exercise-background',
  '/reminders': 'bg-reminders-background',
  '/sleep': 'bg-dark-purple',
  '/social': 'bg-purple-2',
}

/**
 * Root layout component for the application
 * @param {Object} props - Props for RootLayout component
 * @param {React.ReactNode} props.children - Child components to be rendered
 * @author Bernardo de la Sierra
 * @version 1.0.1
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get the current pathname using the usePathname hook from next/navigation
  const pathname = usePathname()

  // Extract the root route from the current pathname
  const rootRoute = pathname.split('/')[1] // Extract the root route from the pathname

  // Determine the background color based on the root route
  const backgroundColor = routes[`/${rootRoute}`] || 'bg-home-background'
  // Verifica si la ruta es 'social' o tiene subrutas bajo 'social'
  const isSocialRoute = pathname.startsWith('/social')

  return (
    <html lang='es'>
      <body className={interFont.className}>
        <div className='relative m-0'>
          {/* Sidebar */}
          <div
            id='Sidebar'
            className='z-[80] m-0 hidden bg-side-color md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col'
          >
            <div>
              <SidebarInfo />
            </div>
          </div>
          {/* Main content area */}
          <main id='MobileSideBar' className='m-0 md:pl-72'>
            <div className='md:hidden lg:hidden'>
              <MobileSidebar />
            </div>
            <div
              id='PrincipalPage'
              className={`relative flex min-h-[95vh] flex-col md:m-0 md:min-h-screen md:pl-8 lg:m-0 lg:pl-8 ${backgroundColor}`}
            >
              <NextAuthProvider>
                <SubscriptionValidation route={pathname}>
                  {/* Decoration component */}
                  <Decoration pathname={pathname} />
                  {/* Render children components */}
                  {isSocialRoute ? (
                    <MainContainer>{children}</MainContainer>
                  ) : (
                    <RecipesContextProvider>
                      {/*Context for recipes**/}
                      <ExercisesContextProvider>
                        {/*Context for exercise routines**/}
                        <AutoevaluationContextProvider>
                          {/**Context for autoevaluation*/}
                          {children}
                        </AutoevaluationContextProvider>
                      </ExercisesContextProvider>
                    </RecipesContextProvider>
                  )}
                </SubscriptionValidation>
              </NextAuthProvider>
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
