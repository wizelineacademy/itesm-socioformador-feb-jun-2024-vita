import { IdNameable } from '@/src/data/datatypes/general'
import Link from 'next/link'
import React from 'react'

interface ColorListProps<T extends IdNameable> {
  baseUrl: string
  baseColor?: string
  hoverColor?: string
  list: T[]
}

const ColorList = <T extends IdNameable>({
  baseUrl,
  baseColor = 'bg-decoration-nutrition-colorlight',
  hoverColor = 'bg-decoration-nutrition-colordark',
  list,
}: ColorListProps<T>) => {
  return (
    <div className='mx-auto flex w-full flex-col justify-center gap-y-8 pt-3'>
      {list.map((el) => (
        <Link key={el.title} href={`${baseUrl}/${el.id}`}>
          <p
            className={`w-full rounded-full px-2 py-5 text-center font-bold leading-5 sm:w-4/5 sm:pl-10 sm:text-left md:max-w-[600px] md:py-6 ${baseColor} hover:${hoverColor} hover:cursor-pointer`}
          >
            {el.title}
          </p>
        </Link>
      ))}
    </div>
  )
}

export default ColorList
