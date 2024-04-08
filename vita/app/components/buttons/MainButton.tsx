import React, { ButtonHTMLAttributes } from 'react';

interface MainButtonProps {
    text: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

const MainButton: React.FC<MainButtonProps> = ({ 
    text,
    onClick
 }) => {
    return (
        <button 
            className="mt-8 w-4/5 px-5 py-3 rounded-2xl mx-auto flex justify-center text-white font-semibold bg-button-blue"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default MainButton;
