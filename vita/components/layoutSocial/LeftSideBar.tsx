'use client';

import Link from "next/link";
import React from "react";
import Image from "next/image";
import Menu from "./Menu";


const LeftSideBar = () => {
  
  return (
    <div className="h-screen left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col 
    gap-6 max-md:hidden 2xl:w-[350px] pr-20 custom-scrollbar">
      <Link href="/social">
        <p className="text-light-1 text-3xl"> Vita </p>
      </Link>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 items-center text-light-1">
            <Link  href="/social">
                <Image src="/assets/noAvatar.png" alt="Foto de Perfil" width={50}
                 height={50} className="rounded-full "/>
            </Link>
            <p className="text-small-bold">
                Bernardo de la S 
            </p>
        </div>
        <div className="flex text-light-1 justify-between">
            <div className="flex flex-col items-center">
                <p className="text-[16px] leading-[140%] font-semibold ">2 </p>
                <p className="text-[10px] leading-[140%] font-medium">Publicaciones</p>
            </div>
            <div className="flex flex-col items-center">
                <p className="text-[16px] leading-[140%] font-semibold">2 </p>
                <p className="text-[10px] leading-[140%] font-medium">Seguidores</p>
            </div>
            <div className="flex flex-col items-center">
                <p className="text-[16px] leading-[140%] font-semibold">2 </p>
                <p className="text-[10px] leading-[140%] font-medium">Siguiendo</p>
            </div>
        </div>

      </div>

      <hr />

      <Menu />

      <hr />


    </div>
  );
};

export default LeftSideBar;
