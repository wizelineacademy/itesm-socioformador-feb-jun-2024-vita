'use client';

import { Search, Add } from "@mui/icons-material";
import React, {useState } from "react";
import { useRouter } from "next/navigation";

const TopBar = () => {
  
    const [search, setSearch] = useState("");

    const router = useRouter();
  return (
    
    <div className="flex justify-between items-center mt-6">
       <div className="relative">
       <input
          type="text"
          className="w-full bg-dark-2 py-3 px-5 rounded-lg focus:outline-none
           text-light-1 text-small-semibold"
          placeholder="Busca publicaciones..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
         <Search
          className="absolute top-2 right-2 text-light-1 cursor-pointer hover:text-pink-1"
          onClick={() => router.push(`/social/search/posts/${search}`)}
        />
       </div>
       <button
        className="flex items-center gap-2 rounded-lg py-2.5 px-3 bg-gradient-to-l from-pink-1 to-purple-1 text-light-1 text-small-semibold max-md:hidden"
        onClick={() => router.push("/social/create-post")}
      >
        <Add /> 
        <p>Crear una Publicación </p>
      </button>
    </div>
  );
};

export default TopBar;
