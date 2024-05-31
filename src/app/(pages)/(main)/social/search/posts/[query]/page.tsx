'use client'

import Loader from '@/src/components/Loader'
import PostCard from '@/src/components/post/PostCard'
import { UserPost } from '@/src/data/datatypes/user'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const SearchPost = ({ params }: { params: { query: string } }) => {
  const query = params.query
  const [user, setUser] = useState<UserPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchedPosts, setSearchedPosts] = useState<Post[]>([])

  const getSearchedPosts = async () => {
    const response = await axios.get(`/api/post/search/${query}`)
    setSearchedPosts(response.data)
    setLoading(false)
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
    getSearchedPosts()
    getUser()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex gap-6'>
        <Link
          className='rounded-lg bg-purple-1 px-4 py-2 text-[14px] font-semibold leading-[140%] text-light-1'
          href={`/social/search/posts/${query}`}
        >
          Publicaciones
        </Link>
        <Link
          className='rounded-lg bg-dark-2 px-4 py-2 text-[14px] leading-[140%] text-light-1'
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

      {searchedPosts.length > 0 ? (
        searchedPosts.map((post) => (
          <PostCard
            key={post.idPost}
            post={post}
            creator={user}
            onPostDelete={getSearchedPosts}
          />
        ))
      ) : (
        <p className='text-3xl text-white'>No se encontraron publicaciones.</p>
      )}
    </div>
  )
}

export default SearchPost
