import React from 'react'

interface ButtonEvaluationProps {
  text: string
  disabled?: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const ButtonEvaluation: React.FC<ButtonEvaluationProps> = ({
  text,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      className='z-20 mx-auto mt-5 flex w-full max-w-[300px] justify-center rounded-full bg-button-blue px-5 py-3 text-lg font-semibold text-white hover:bg-mid-blue sm:float-left sm:ml-0'
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default ButtonEvaluation
