'use client'

import Loader from '@/src/components/Loader'
import UserCard from '@/src/components/post/UserCard'
import { UserPost } from '@/src/data/datatypes/user'
import axios from 'axios'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const SearchUser = ({ params }: { params: { query: string } }) => {
  const query = params.query
  const [user, setUser] = useState<UserPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchedUsers, setSearchedUsers] = useState<UserPost[]>([])

  const getSearchedUsers = async () => {
    try {
      const response = await fetch(`/api/post/user/search/${query}`)
      const data = await response.json()

      // Verifica que la respuesta sea un array
      if (Array.isArray(data)) {
        setSearchedUsers(data)
      } else {
        setSearchedUsers([])
        console.error('Expected array but got:', data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const getUser = async () => {
    try {
      const response = await axios.get('/api/post/user')
      setUser(response.data)
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getSearchedUsers()
    getUser()
  }, [query]) // Asegúrate de que el efecto dependa de 'query'

  if (loading) {
    return <Loader />
  }

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex gap-6'>
        <Link
          className='rounded-lg bg-dark-2 px-4 py-2 text-[14px] font-semibold leading-[140%] text-light-1'
          href={`/social/search/posts/${query}`}
        >
          Publicaciones
        </Link>
        <Link
          className='rounded-lg bg-purple-1 px-4 py-2 text-[14px] leading-[140%] text-light-1'
          href={`/social/search/people/${query}`}
        >
          Personas
        </Link>
        <Link
          className='rounded-lg bg-dark-2 px-4 py-2 text-[14px] leading-[140%] text-light-1'
          href={`/social/`}
        >
          Regresar
        </Link>
      </div>

      {searchedUsers.length > 0 ? (
        searchedUsers.map((userData) => (
          <UserCard key={userData.idUser} userData={userData} creator={user} />
        ))
      ) : (
        <p className='text-3xl text-white'>No se encontraron Usuarios.</p>
      )}
    </div>
  )
}

export default SearchUser
