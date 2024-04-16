import { ArrowRight } from 'lucide-react';
import React from 'react';

interface PlanItemProps {
    content: string;
    tag: string;
    onClick: React.MouseEventHandler<HTMLLIElement>
}

const PlanItemLink: React.FC<PlanItemProps> = ({ 
    content,
    tag,
    onClick
 }) => {
    return (
        <li 
            onClick={onClick}
            data-value={content}
            className="w-5/6 mt-5 px-6 py-6 text-md mx-auto rounded-3xl flex justify-between items-center text-center text-white font-medium bg-custom-lightpurple hover:cursor-pointer hover:bg-custom-extralightpurple sm:py-7 lg:text-lg lg:rounded-full lg:py-6 md:max-w-[1200px]"
        >
            <p>{content}</p>
            <div className="flex space-x-5 xl:space-x-10">
                <p>{tag}</p>
                <ArrowRight width={30} height={30} className='hidden lg:inline-block'/>
            </div>
            
        </li>
    );
};

export default PlanItemLink;
