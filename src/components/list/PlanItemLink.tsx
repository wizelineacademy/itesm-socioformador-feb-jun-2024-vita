import { ArrowRight } from 'lucide-react'
import React from 'react'

interface PlanItemProps {
  content: string
  tag: string
  onClick: React.MouseEventHandler<HTMLLIElement>
  color?: string
  hoverColor?: string
}

const PlanItemLink: React.FC<PlanItemProps> = ({
  content,
  tag,
  onClick,
  color = 'bg-custom-lightpurple',
  hoverColor = 'bg-custom-extralightpurple',
}) => {
  return (
    <li
      onClick={onClick}
      data-value={content}
      className={`text-md mx-auto mt-5 flex w-5/6 flex-col items-start justify-between gap-y-2 rounded-3xl px-6 py-6 text-center font-medium text-white ${color} hover:cursor-pointer hover:${hoverColor} sm:flex-row sm:items-center sm:py-7 md:max-w-[1200px] md:rounded-full lg:py-6 lg:text-lg`}
    >
      <p className='text-left font-semibold'>{content}</p>
      <div className='flex items-center gap-x-5 xl:gap-x-10'>
        <p className='h-auto text-left md:w-[100px] lg:w-[150px] xl:w-[200px]'>
          {tag}
        </p>
        <ArrowRight className='hidden lg:inline-block lg:h-9 lg:w-9' />
      </div>
    </li>
  )
}

export default PlanItemLink
