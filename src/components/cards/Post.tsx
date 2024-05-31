import Image from 'next/image'
import React from 'react'

interface PostCardProps {
  name: string
  description: string
  imageUrl: string
}

const PostCard: React.FC<PostCardProps> = ({ name, description, imageUrl }) => {
  return (
    <article className='mx-auto mb-10 flex w-11/12 max-w-[400px] flex-col items-center gap-y-5 rounded-lg bg-decoration-home-colordark px-5 sm:w-4/5 sm:px-10 lg:w-5/12 xl:w-3/12'>
      <h2 className='mt-10 text-center text-xl font-bold'>{name}</h2>
      <Image
        width={400}
        height={400}
        src={imageUrl}
        alt={name}
        className='w-full max-w-[350px] sm:w-4/5 lg:w-full'
      />
      <p className='mb-10 text-center text-lg'>{description}</p>
    </article>
  )
}

export default PostCard
