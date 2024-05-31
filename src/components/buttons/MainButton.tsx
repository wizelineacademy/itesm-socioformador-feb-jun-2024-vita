import React from 'react'

interface MainButtonProps {
  text: string
  disabled?: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const MainButton: React.FC<MainButtonProps> = ({
  text,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      className='z-20 mx-auto mt-8 flex w-4/5 max-w-72 justify-center rounded-2xl bg-button-blue px-5 py-4 font-semibold text-white hover:bg-mid-blue md:py-4 lg:float-right lg:mr-0'
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default MainButton
