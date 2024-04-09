import { ArrowRight } from 'lucide-react';
import React from 'react';

interface ListItemProps {
    text: string;
}

const ListItemLink: React.FC<ListItemProps> = ({ 
    text
 }) => {
    return (
        <li className="w-5/6 mt-5 px-6 py-6 text-md mx-auto rounded-3xl flex justify-between items-center text-center text-white font-medium bg-custom-lightpurple sm:py-7 lg:text-lg lg:rounded-full lg:py-6 md:max-w-[1200px]">
            {text}
            <ArrowRight width={30} height={30} className='hidden lg:inline-block'/>
        </li>
    );
};

export default ListItemLink;
