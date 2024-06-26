'use client'
import Loader from '@/src/components/Loader'
import PostCard from '@/src/components/post/PostCard'
import { Post } from '@/src/data/datatypes/posts'
import { UserPost } from '@/src/data/datatypes/user'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Social = () => {
  const [feedPost, setFeedPost] = useState<Post[]>([])
  const [user, setUser] = useState<UserPost[]>([])
  const [loading, setLoading] = useState(true)

  const getFeedPost = async () => {
    try {
      const response = await axios.get('/api/post')
      setFeedPost(response.data)
    } catch (error) {
      console.error('Failed to fetch posts:', error)
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
    getFeedPost()
    getUser()
  }, [])

  if (loading) return <Loader />

  return (
    <div className='flex flex-col items-center justify-center gap-8'>
      {feedPost.map((post) => (
        <PostCard
          key={post.idPost}
          post={post}
          creator={user}
          onPostDelete={getFeedPost}
        />
      ))}
    </div>
  )
}

export default Social
