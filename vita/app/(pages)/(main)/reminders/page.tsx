
'use client';

import React, { useState, useEffect } from "react";
import { FaRunning, FaBullseye,  FaDumbbell} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const Reminders = () => {
  

  return (
    <>
       <div className="flex   px-5 py-4 text-5xl font-bold 
        lg:justify-start md:justify-start justify-center">
        <h1 className="mr-2 text-black ">Papa </h1>
        <FaRunning  size={36}  color="white"/>
      </div>
      
    </>
  );
};

export default Reminders;
