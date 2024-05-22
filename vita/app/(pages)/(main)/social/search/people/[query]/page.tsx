"use client";

import Loader from "@/components/Loader";
import PostCard from "@/components/post/PostCard";
import { UserPost} from "@/data/datatypes/user";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPost = () => {
  const { search: query } = useParams(); 
  const [user, setUser] = useState<UserPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchedPosts, setSearchedPosts] = useState<Post[]>([]);

  const getSearchedPosts = async () => {
    try {
      const response = await fetch(`/api/post/user/search/${query}`);
      const data = await response.json();
      
      // Verifica que la respuesta sea un array
      if (Array.isArray(data)) {
        setSearchedPosts(data);
      } else {
        setSearchedPosts([]);
        console.error("Expected array but got:", data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get("/api/post/user");
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
      getSearchedPosts();
      getUser();
  }, [query]); // Asegúrate de que el efecto dependa de 'query'

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-6">
        <Link className="px-4 py-2 rounded-lg text-light-1 text-[14px] leading-[140%] font-semibold
             bg-dark-2 " href={`/social/search/posts/${query}`}>
          Publicaciones
        </Link>
        <Link className="px-4 py-2 rounded-lg text-light-1 text-[14px] leading-[140%] 
        bg-purple-1" href={`/social/search/people/${query}`}>
          Personas
        </Link> 
      </div>
      
      {searchedPosts.length > 0 ? (
        searchedPosts.map((post) => (
          <PostCard 
            key={post.idPost}
            post={post}
            creator={user}
            onPostDelete={getSearchedPosts} 
          />
        ))
      ) : (
        <p className="text-white text-3xl ">No se encontraron publicaciones.</p>
      )}
    </div>
  );
};

export default SearchPost;
