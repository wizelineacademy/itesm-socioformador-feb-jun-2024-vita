import { useState, ReactNode } from 'react'
import { Transition } from '@headlessui/react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

interface ToggleProps {
  title: string
  children: ReactNode
  editModeToggle: boolean
}

const ToggleComponent = ({ title, children, editModeToggle }: ToggleProps) => {
  const [isOpen, setIsOpen] = useState(editModeToggle)

  const toggleOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    setIsOpen(!isOpen)
  }

  return (
    <div className='mt-2'>
      <button
        onClick={toggleOpen}
        className='flex w-3/4 items-center justify-between rounded-2xl bg-toggle-title px-4 py-2 focus:outline-none'
      >
        <p className='text-2xl text-white'>{title}</p>
        {isOpen ? (
          <FaChevronUp className='h-5 w-5' color='white' />
        ) : (
          <FaChevronDown className='h-5 w-5' color='white' />
        )}
      </button>
      <Transition
        show={isOpen}
        enter='transition-opacity duration-500'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-500'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='mt-2 w-3/4 rounded-2xl bg-toggle-content px-4 py-2'>
          {children}
        </div>
      </Transition>
    </div>
  )
}

export default ToggleComponent
