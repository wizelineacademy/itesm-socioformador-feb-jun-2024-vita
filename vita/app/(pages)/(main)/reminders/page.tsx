
'use client';

import React, { useState, useEffect } from "react";
import { FaBell } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const Reminders = () => {
  

  return (
    <>
       <div className="flex flex-col  px-5 py-4 text-4xl font-bold 
        lg:justify-start md:justify-start justify-center">
        <span className="flex flex-row"> 
          <h1 className="mr-2 text-white ">Recordatorios</h1>
          <FaBell size={36}  color="white"/>
        </span> 
        <Link href="/reminders/crudreminders">
          <div className=" lg:justify-start md:justify-start justify-center text-white text-2xl 
          bg-reminders-color mt-4 px-4 py-2 w-[280px] rounded-3xl ">
            Crea un recordatorio
          </div>
        </Link>
      </div>
      
    </>
  );
};

export default Reminders;
