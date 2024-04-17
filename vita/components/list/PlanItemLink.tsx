import { ArrowRight } from 'lucide-react';
import React from 'react';

interface PlanItemProps {
    content: string;
    tag: string;
    onClick: React.MouseEventHandler<HTMLLIElement>,
    color?: string,
    hoverColor?: string
}

const PlanItemLink: React.FC<PlanItemProps> = ({ 
    content,
    tag,
    onClick,
    color = "bg-custom-lightpurple",
    hoverColor = "bg-custom-extralightpurple"
 }) => {
    return (
        <li 
            onClick={onClick}
            data-value={content}
            className={`w-5/6 mt-5 px-6 py-6 text-md mx-auto rounded-3xl flex flex-col gap-y-2 items-start justify-between text-center text-white font-medium ${color} hover:cursor-pointer hover:${hoverColor} sm:py-7 sm:flex-row sm:items-center lg:text-lg md:rounded-full lg:py-6 md:max-w-[1200px]`}
        >
            <p className='font-semibold text-left'>{content}</p>
            <div className="flex gap-x-5 xl:gap-x-10 items-center">
                <p className='text-left md:w-[100px] lg:w-[150px] xl:w-[200px] h-auto'>{tag}</p>
                <ArrowRight className='hidden lg:inline-block lg:w-9 lg:h-9'/>
            </div>
            
        </li>
    );
};

export default PlanItemLink;
