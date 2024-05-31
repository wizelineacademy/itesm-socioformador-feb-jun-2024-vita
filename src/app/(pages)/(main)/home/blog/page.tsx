"use client";

import { Post } from "@/src/data/datatypes/posts";
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "@/src/components/cards/Post";

const GeneralData = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [finished, setFinished] = useState(false);
    const [error, setError] = useState<any>(null);
    const [page, setPage] = useState(0);

    const fetchPosts = async() => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await axios.get<Post[]>(`/api/posts?limit=6&offset=${page}`);
            if(res.data.length === 0){
                setFinished(true);
                return;
            }
            const idExisting = posts.findIndex(post => post.idArticle === res.data[0].idArticle);
            if(idExisting === -1){
                setPosts(prev => [...prev, ...res.data]);
                setPage(prevPage => prevPage + 1);
                
            }
        } catch(error){
            setError(error);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    return (

        <div className="p-4">
            <div className="w-full">
            <InfiniteScroll
                className="w-full md:py-16 lg:py-32 lg:flex lg:flex-wrap lg:justify-around lg:gap-x-1"
                dataLength={posts.length}
                next={fetchPosts}
                hasMore={!finished}
                loader={<p className="w-full text-lg font-bold text-center mb-5">Cargando...</p>}
                endMessage={<p className="w-full text-lg font-bold text-center mb-5">Estas son todas las publicaciones por el momento. Vuelve más tarde...</p>}
            >
                {posts && 
                    posts?.map((post) => (
                        <PostCard
                            key={post.name}
                            name={post.name}
                            description={post.description}
                            imageUrl={post.imageUrl}
                        />  
                ))}
            </InfiniteScroll>
            </div>
            {error && <p className="w-full text-lg font-bold text-center mb-5">Error: {error.message}</p>}
        </div>
        
        
        
    )
}

export default GeneralData;