import React from 'react';
import { IconType } from 'react-icons';
import { FaCheck } from 'react-icons/fa';

interface SelectableCardProps {
    text: string;
    icon: IconType;
    selected: boolean;
    toggle: () => void;
}

const SelectableCard: React.FC<SelectableCardProps> = ({ 
    text,
    icon:Icon,
    selected,
    toggle
 }) => {
    return (
        <div 
            onClick={() => {
                toggle()
            }}
            className={`w-11/12 max-w-[450px] mt-5 px-5 py-4 mx-auto rounded-full flex justify-between items-center text-white ${selected ? "bg-dark-green" : "bg-mid-green"} hover:cursor-pointer hover:bg-dark-green transition-colors ease-in delay-75 md:w-2/5 md:flex-col md:rounded-3xl md:items-start md:justify-center md:space-y-8 md:py-10 lg:w-3/12 lg:min-w-[200px] xl:h-64 lg:max-w-[400px]`}
        >
            <Icon className="ml-[5%] w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20"/>
            
            <div className='flex justify-around items-center w-3/5 mr-[5%] md:mr-0 md:w-full lg:justify-between'>
                <p className="text-lg font-semibold md:text-xl">{text}</p>
                <div className='w-5 lg:mr-2'>
                    {selected && <FaCheck className='w-6 h-6'/>}
                </div>
            </div>
            
        </div>
    );
};

export default SelectableCard;
