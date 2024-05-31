import React, { ReactNode } from 'react'

interface SelectableCardWrapperProps {
  children: ReactNode
}

const SelectableCardWrapper: React.FC<SelectableCardWrapperProps> = ({
  children,
}) => {
  return (
    <div className='mb-10 mt-5 flex w-full flex-col justify-around md:flex-row md:flex-wrap md:items-center md:justify-center lg:mx-auto lg:w-11/12 lg:gap-x-8 lg:gap-y-3'>
      {children}
    </div>
  )
}

export default SelectableCardWrapper
