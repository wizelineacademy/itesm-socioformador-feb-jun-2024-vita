import React from 'react'
import { IconType } from 'react-icons'
import { FaCheck } from 'react-icons/fa'

interface SelectableCardProps {
  text: string
  icon: IconType
  selected: boolean
  toggle: () => void
}

const SelectableCard: React.FC<SelectableCardProps> = ({
  text,
  icon: Icon,
  selected,
  toggle,
}) => {
  return (
    <button
      onClick={() => {
        toggle()
      }}
      className={`mx-auto mt-5 flex w-11/12 max-w-[450px] items-center justify-between rounded-full px-5 py-4 text-white ${selected ? 'bg-dark-green' : 'bg-mid-green'} transition-colors delay-75 ease-in hover:cursor-pointer hover:bg-dark-green md:w-2/5 md:flex-col md:items-start md:justify-center md:space-y-8 md:rounded-3xl md:py-10 lg:w-3/12 lg:min-w-[200px] lg:max-w-[400px] xl:h-64`}
    >
      <Icon className='ml-[5%] h-10 w-10 md:h-14 md:w-14 lg:h-20 lg:w-20' />

      <div className='mr-[5%] flex w-3/5 items-center justify-around md:mr-0 md:w-full lg:justify-between'>
        <p className='text-lg font-semibold md:text-xl'>{text}</p>
        <div className='w-5 lg:mr-2'>
          {selected && <FaCheck className='h-6 w-6' />}
        </div>
      </div>
    </button>
  )
}

export default SelectableCard
