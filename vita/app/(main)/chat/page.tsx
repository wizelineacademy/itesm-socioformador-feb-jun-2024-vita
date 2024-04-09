
'use client';
import { FaComments  } from 'react-icons/fa';
import React, { useState } from "react";


const Chat= () => {
  return (
    <>
  
      <div className="flex text-white px-5 py-4 text-5xl font-bold 
        lg:justify-start md:justify-start justify-center">
        <h1 className="mr-2">Chat</h1>
        <FaComments className='pl-2'/>
      </div>
    </>
  );
};

export default Chat;
