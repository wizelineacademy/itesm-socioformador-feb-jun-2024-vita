import React, { ReactNode } from 'react';

interface SelectableCardWrapperProps {
    children: ReactNode
}

const SelectableCardWrapper: React.FC<SelectableCardWrapperProps> = ({ 
    children
 }) => {
    return (
        <div className="w-full mt-5 mb-10 flex flex-col justify-around md:flex-row md:flex-wrap md:justify-center md:items-center lg:w-11/12 lg:mx-auto lg:gap-x-8 lg:gap-y-3">
            {children}
        </div>
    );
};

export default SelectableCardWrapper;
