'use client'
import Image from 'next/image'
import Link from 'next/link'
import { UserPost } from '@/src/data/datatypes/user'
import { tabs } from '@/src/constants'
import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react'
import { PersonAddAlt, PersonRemove } from '@mui/icons-material'

interface UserCardProps {
  userData: UserPost
  creator: UserPost[]
  activeTab: string
}

const ProfileCard: React.FC<UserCardProps> = ({
  userData,
  activeTab,
  creator,
}) => {
  const profilePhoto = userData.profilePhoto ?? '/assets/noAvatar.png'
  const [postCount, setPostCount] = useState<number>(0)
  const [followersCount, setFollowersCount] = useState<number>(0)
  const [followingCount, setFollowingCount] = useState<number>(0)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    getPostCount()
    getFollowingCount()
    getFollowersCount()
  }, [])

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const response = await axios.get(`/api/user/follow/${userData.idUser}`)
        setIsFollowing(response.data.isFollowing)
      } catch (error) {
        console.error('Error fetching follow status:', error)
      }
    }

    fetchFollowStatus()
  }, [userData.idUser])
  const getPostCount = async () => {
    try {
      const response = await axios.get(
        `/api/profileSocial/post/${userData.idUser}`,
      )
      setPostCount(response.data.length)
    } catch (error) {
      console.error('Failed to fetch post count:', error)
    }
  }

  const getFollowingCount = async () => {
    try {
      const response = await axios.get(`/api/user/following/${userData.idUser}`)
      setFollowingCount(response.data.length)
    } catch (error) {
      console.error('Failed to fetch following count:', error)
    }
  }

  const getFollowersCount = async () => {
    try {
      const response = await axios.get(`/api/user/followers/${userData.idUser}`)
      setFollowersCount(response.data.length)
    } catch (error) {
      console.error('Failed to fetch followers count:', error)
    }
  }

  const handleFollow = async () => {
    try {
      // Realizar la solicitud de seguimiento
      const response = await axios.post(`/api/user/follow/${userData.idUser}`)
      if (response.data.message === 'User followed successfully') {
        setIsFollowing(true)
      } else if (response.data.message === 'User unfollowed successfully') {
        setIsFollowing(false)
      }
    } catch (error) {
      console.error('Error toggling follow status:', error)
    }
  }

  return (
    <div className='flex flex-col gap-9'>
      <div className='flex items-start justify-between'>
        <div className='flex items-start gap-5'>
          <Image
            src={profilePhoto}
            alt='profile photo'
            width={100}
            height={100}
            className='rounded-full md:max-lg:hidden'
          />

          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-2 max-sm:flex-col max-sm:gap-0.5'>
              <p className='text-2xl text-light-1'>{userData.name}</p>
            </div>

            <div className='text-small-bold flex gap-7 max-sm:gap-4'>
              <div className='flex items-center gap-2 max-sm:flex-col max-sm:gap-0.5'>
                <p className='text-purple-1'>{postCount}</p>
                <p className='text-light-1'>Publicaciones</p>
              </div>
              <Link href={`/social/profile/${userData.idUser}/followers`}>
                <div className='flex cursor-pointer items-center gap-2 hover:underline max-sm:flex-col max-sm:gap-0.5'>
                  <p className='text-purple-1'>{followersCount}</p>
                  <p className='text-light-1'>Seguidores</p>
                </div>
              </Link>
              <Link href={`/social/profile/${userData.idUser}/following`}>
                <div className='flex cursor-pointer items-center gap-2 hover:underline max-sm:flex-col max-sm:gap-0.5'>
                  <p className='text-purple-1'>{followingCount}</p>
                  <p className='text-light-1'>Siguiendo</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {userData.idUser !== creator[0]?.idUser &&
          (isFollowing ? (
            <PersonRemove
              sx={{ color: '#7857FF', cursor: 'pointer', fontSize: '40px' }}
              onClick={() => handleFollow()}
            />
          ) : (
            <PersonAddAlt
              sx={{ color: '#7857FF', cursor: 'pointer', fontSize: '40px' }}
              onClick={() => handleFollow()}
            />
          ))}
      </div>

      <div className='flex gap-6'>
        {tabs.map((tab) => (
          <Link
            key={userData.idUser}
            className={`tab ${
              activeTab === tab.link
                ? 'bg-purple-1 p-2 text-light-1'
                : 'bg-dark-2 p-2 text-light-1'
            }`}
            href={`/social/profile/${userData.idUser}/${tab.link}`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProfileCard
