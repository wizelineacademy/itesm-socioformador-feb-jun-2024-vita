import { ArrowRight } from 'lucide-react'
import React from 'react'

interface ListItemProps {
  text: string
  onClick: React.MouseEventHandler<HTMLLIElement>
}

const ListItemLink: React.FC<ListItemProps> = ({ text, onClick }) => {
  return (
    <li
      onClick={onClick}
      data-value={text}
      className='text-md mx-auto mt-5 flex w-5/6 items-center justify-between rounded-3xl bg-custom-lightpurple px-6 py-6 text-center font-medium text-white hover:cursor-pointer hover:bg-custom-extralightpurple sm:py-7 md:max-w-[1200px] lg:rounded-full lg:py-6 lg:text-lg'
    >
      {text}
      <ArrowRight width={30} height={30} className='hidden lg:inline-block' />
    </li>
  )
}

export default ListItemLink
