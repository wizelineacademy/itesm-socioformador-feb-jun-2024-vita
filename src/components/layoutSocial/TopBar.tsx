'use client'

import { Search, Add } from '@mui/icons-material'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const TopBar = () => {
  const pathname = usePathname()
  const [search, setSearch] = useState('')

  const router = useRouter()

  const handleSearch = () => {
    console.log('handleSearch called')
    const searchPath = pathname.includes('people')
      ? `/social/search/people/${search}`
      : `/social/search/posts/${search}`
    console.log('Navigating to:', searchPath)
    router.push(searchPath)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className='mt-6 flex items-center justify-between'>
      <div className='relative'>
        <input
          type='text'
          className='text-small-semibold w-full rounded-lg bg-dark-2 px-5 py-3 text-light-1 focus:outline-none'
          placeholder='Busca publicaciones...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown} // Añadimos el manejador de evento aquí
        />
        <Search
          className='absolute right-2 top-2 cursor-pointer text-light-1 hover:text-pink-1'
          onClick={handleSearch}
        />
      </div>
      <button
        className='text-small-semibold flex items-center gap-2 rounded-lg bg-gradient-to-l from-pink-1 to-purple-1 px-3 py-2.5 text-light-1 max-md:hidden'
        onClick={() => router.push('/social/create-post')}
      >
        <Add />
        <p>Crear una Publicación</p>
      </button>
    </div>
  )
}

export default TopBar
