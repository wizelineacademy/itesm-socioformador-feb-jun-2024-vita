import Image from 'next/image';
import React from 'react';

interface PostCardProps {
    name: string;
    description: string;
    imageUrl: string;
}

const PostCard: React.FC<PostCardProps> = ({ 
    name,
    description,
    imageUrl
 }) => {
    return (
        <article 
            className="w-11/12 sm:w-4/5 lg:w-5/12 xl:w-3/12 max-w-[400px] mb-10 rounded-lg mx-auto px-5 sm:px-10 flex flex-col items-center gap-y-5 bg-decoration-home-colordark"
        >
            <h2 className="mt-10 text-xl text-center font-bold">{name}</h2>
            <Image
                width={400}
                height={400}
                src={imageUrl}
                alt={name}
                className="w-full sm:w-4/5 lg:w-full max-w-[350px]"
            />
            <p className="text-lg mb-10 text-center">{description}</p>
        </article>   
    )
 }

 export default PostCard;