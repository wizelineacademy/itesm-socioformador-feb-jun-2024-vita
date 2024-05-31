import React from 'react'
import { FaFaceFrown, FaFaceMeh, FaFaceSmile } from 'react-icons/fa6'

interface FaceScaleProps {
  quality: number
  setQuality: (quality: number) => void
}

const FaceScale: React.FC<FaceScaleProps> = ({ quality, setQuality }) => {
  const qualities = [
    {
      Icon: FaFaceFrown,
      color: 'fill-red-500',
      value: 1,
    },
    {
      Icon: FaFaceFrown,
      color: 'fill-orange-500',
      value: 2,
    },
    {
      Icon: FaFaceMeh,
      color: 'fill-yellow-500',
      value: 3,
    },
    {
      Icon: FaFaceSmile,
      color: 'fill-green-500',
      value: 4,
    },
    {
      Icon: FaFaceSmile,
      color: 'fill-green-700',
      value: 5,
    },
  ]

  return (
    <div className='flex gap-x-5 sm:gap-x-10'>
      {qualities.map((qual) => (
        <div
          key={qual.value}
          className='flex w-fit flex-col items-center gap-y-4 lg:gap-y-6'
        >
          <p className='text-lg font-bold lg:text-xl'>{qual.value}</p>
          <qual.Icon
            size={40}
            className={`z-10 sm:scale-125 sm:transform lg:scale-[140%] ${quality === qual.value ? qual.color : 'fill-white'} hover:cursor-pointer hover:fill-gray-400`}
            onClick={() => {
              setQuality(qual.value)
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default FaceScale
