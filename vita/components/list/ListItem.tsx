import React from 'react';

interface ListItemProps {
    text: string;
}

const ListItem: React.FC<ListItemProps> = ({ 
    text
 }) => {
    return (
        <li className="w-4/5 mt-5 px-5 py-3 mx-auto rounded-3xl flex text-white font-medium bg-custom-lightpurple sm:w-3/5 md:w-2/5 md:py-4 md:max-w-[275px]">
            {text}
        </li>
    );
};

export default ListItem;
