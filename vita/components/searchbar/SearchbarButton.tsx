import React, { ReactNode, SetStateAction } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarButtonProps {
    list: string[],
    setList: React.Dispatch<SetStateAction<string[]>>,
    action: () => void;
}

const SearchBarButton: React.FC<SearchBarButtonProps> = ({ 
    list,
    setList,
    action
 }) => {

    const filterList = (search: string) => {
        const newList = list.filter(el => {
            return el.toLowerCase().includes(search.toLowerCase());
        })
        setList(newList);
    }

    return (
        
        <div className="w-11/12 mt-5 max-w-[450px] mx-auto flex flex-col gap-x-5 gap-y-5 lg:flex-row lg:max-w-[900px] lg:ml-0">

            <div className='w-full flex items-center justify-around bg-input-green rounded-full py-1 px-2 lg:w-4/5'>

                <input 
                    onChange={(e) => {
                        filterList(e.target.value)
                    }}
                    type="text"
                    placeholder="Hombros"
                    className='w-4/5 py-3 px-5 text-white bg-input-green rounded-full focus:outline-none lg:py-4'/>

                <FaSearch color='white' className="w-7 h-7 mr-3"/>
            </div>
            <button 
                onClick={() => {
                    action()
                }}
                className='w-full py-4 px-6 z-10 text-white font-bold bg-button-blue rounded-full lg:w-1/5 hover:bg-mid-blue'>
                    Continuar
            </button>
        </div>

    );
};

export default SearchBarButton;
