'use client'

import { pageTitles } from '@/src/constants'
import TopBar from './TopBar'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface MainContainerProps {
  children: ReactNode
}

const MainContainer = ({ children }: MainContainerProps) => {
  // Get the current url path
  const currentPath = usePathname()

  // Function to match dynamic routes
  const getTitle = (path: string) => {
    // Remove dynamic parts of the path
    const staticPath = path.split('/').slice(0, 3).join('/')
    for (const page of pageTitles) {
      if (staticPath === page.url) {
        return page.title
      }
    }
    return ''
  }

  // Get title of current path
  const title = getTitle(currentPath)

  return (
    <section className='flex flex-1 flex-col px-4 md:px-10 lg:px-4 xl:px-20'>
      <TopBar />
      <div className='mb-20 mt-6'>
        <h1 className='mb-5 text-[30px] font-bold leading-[140%] text-light-1 max-sm:text-[24px]'>
          {title}
        </h1>
        <div>{children}</div>
      </div>
    </section>
  )
}

export default MainContainer
