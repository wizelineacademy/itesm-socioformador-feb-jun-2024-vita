'use client'
import { useState, ReactNode } from 'react';
import { Transition } from '@headlessui/react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Importa los íconos de las flechas

interface ToggleProps {
  title: string;
  children: ReactNode;
}

const ToggleComponent = ({ title, children }: ToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='mt-2'>
      <button
        onClick={toggleOpen}
        className=" bg-toggle-title px-4 py-2 rounded-2xl focus:outline-none flex items-center
         justify-between w-3/4"
      >
        <p className='text-2xl text-white'>{title}</p>
        {isOpen ? (
          <FaChevronUp className="h-5 w-5 " color='white' /> 
        ) : (
          <FaChevronDown className="h-5 w-5"color='white' />
        )}
      </button>
      <Transition
        show={isOpen}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="mt-2  w-3/4 bg-toggle-content px-4 py-2 rounded-2xl">
          {children}
        </div>
      </Transition>
    </div>
  );
};

export default ToggleComponent;
