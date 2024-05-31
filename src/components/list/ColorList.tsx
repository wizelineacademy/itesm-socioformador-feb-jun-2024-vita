import { IdNameable } from '@/src/data/datatypes/general';
import Link from 'next/link';
import React from 'react';

interface ColorListProps<T extends IdNameable> {
    baseUrl: string,
    baseColor?: string,
    hoverColor?: string,
    list: T[]
}

const ColorList = <T extends IdNameable,>({ 
    baseUrl,
    baseColor = "bg-decoration-nutrition-colorlight",
    hoverColor = "bg-decoration-nutrition-colordark",
    list
 }: ColorListProps<T>) => {
    return (
        <div className="pt-3 w-full mx-auto flex flex-col justify-center gap-y-8">
                {list.map(el => (
                    <Link key={el.title} href={`${baseUrl}/${el.id}`}>
                        <p 
                            className={`w-full sm:w-4/5 md:max-w-[600px] py-5 px-2 md:py-6 leading-5 rounded-full font-bold text-center sm:pl-10 sm:text-left ${baseColor} hover:${hoverColor} hover:cursor-pointer`} 
                        >
                            {el.title}
                        </p>
                    </Link>
                ))}
        </div>
    );
};

export default ColorList;