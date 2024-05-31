import React from 'react'

interface ListItemProps {
  text: string
}

const ListItem: React.FC<ListItemProps> = ({ text }) => {
  return (
    <li className='mx-auto mt-5 flex w-4/5 rounded-3xl bg-custom-lightpurple px-5 py-3 font-medium text-white sm:w-3/5 md:w-2/5 md:max-w-[275px] md:py-4'>
      {text}
    </li>
  )
}

export default ListItem
