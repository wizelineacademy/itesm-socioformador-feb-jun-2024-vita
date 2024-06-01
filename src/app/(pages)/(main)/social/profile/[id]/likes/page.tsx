'use client'
import Loader from '@/src/components/Loader'
import PostCard from '@/src/components/post/PostCard'
import ProfileCard from '@/src/components/post/ProfileCard'
import { Post } from '@/src/data/datatypes/posts'
import { UserPost } from '@/src/data/datatypes/user' // Importa los tipos correctos
import axios from 'axios'
import { useEffect, useState } from 'react'

const ProfilePosts = ({ params }: { params: { id: string } }) => {
  const id = params.id
  const [feedLikes, setFeedLikes] = useState<Post[]>([])
  const [userProfile, setUserProfile] = useState<UserPost | null>(null)
  const [user, setUser] = useState<UserPost[]>([])
  const [loading, setLoading] = useState(true)

  const getUserProfile = async () => {
    try {
      const response = await axios.get(`/api/profileSocial/${id}`)
      setUserProfile(response.data)
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
    }
  }

  const getFeedLikes = async () => {
    try {
      const response = await axios.get(`/api/profileSocial/likes/${id}`)
      setFeedLikes(response.data)
    } catch (error) {
      console.error('Failed to fetch likes:', error)
    }
  }

  const getUser = async () => {
    try {
      const response = await axios.get('/api/post/user')
      setUser(response.data)
    } catch (error) {
      console.error('Failed to fetch user:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await Promise.all([getFeedLikes(), getUser(), getUserProfile()])
      setLoading(false)
    }

    fetchData()
  }, [id])

  if (loading) return <Loader />

  return (
    <div className='flex flex-col gap-9'>
      {userProfile && (
        <ProfileCard
          userData={userProfile}
          creator={user}
          activeTab='Publicaciones'
        />
      )}
      <div className='flex flex-col gap-9'>
        {feedLikes.map((like) => (
          <PostCard
            key={like.idPost}
            post={like}
            creator={user}
            onPostDelete={getFeedLikes}
          />
        ))}
      </div>
    </div>
  )
}

export default ProfilePosts
