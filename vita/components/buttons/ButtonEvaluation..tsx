import React from 'react';

interface ButtonEvaluationProps {
    text: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

const ButtonEvaluation: React.FC<ButtonEvaluationProps> = ({ 
    text,
    onClick
 }) => {
    return (
        <button 
            className="mt-5 max-w-[300px] w-full px-5 py-3 rounded-full mx-auto flex justify-center text-white text-lg font-semibold bg-button-blue hover:bg-mid-blue sm:float-left sm:ml-0"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default ButtonEvaluation;
