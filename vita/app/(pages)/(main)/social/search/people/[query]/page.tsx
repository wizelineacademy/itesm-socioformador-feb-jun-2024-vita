"use client";

import Loader from "@/components/Loader";
import UserCard from "@/components/post/UserCard";
import { UserPost} from "@/data/datatypes/user";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchUser = ({ params }: { params: { query: string } }) => {
  const query= params.query;
  const [user, setUser] = useState<UserPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchedUsers, setSearchedUsers] = useState<UserPost[]>([]);

  const getSearchedUsers = async () => {
    try {
      const response = await fetch(`/api/post/user/search/${query}`);
      const data = await response.json();
      
      // Verifica que la respuesta sea un array
      if (Array.isArray(data)) {
        setSearchedUsers(data);
      } else {
        setSearchedUsers([]);
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
      getSearchedUsers();
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
        <Link className="px-4 py-2 rounded-lg text-light-1 text-[14px] leading-[140%] 
        bg-dark-2" href={`/social/`}>
          Regresar
        </Link> 
        
      </div>
      
      {searchedUsers.length > 0 ? (
        searchedUsers.map((userData) => (
          <UserCard 
            key={userData.idUser}
            userData={userData}
            creator={user}
          />
        ))
      ) : (
        <p className="text-white text-3xl ">No se encontraron Usuarios.</p>
      )}
    </div>
  );
};

export default SearchUser;
