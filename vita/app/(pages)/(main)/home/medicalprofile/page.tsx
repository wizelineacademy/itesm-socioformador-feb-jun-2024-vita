'use client';

'use client';
import Swal from 'sweetalert2';
import React, { useState, useEffect} from "react";
import axios from  "axios"
import { formatDays } from '@/lib/DaysFormat/days';
import { EditHealthData, HealthData } from '@/data/datatypes/healthdata';
import { FaEye, FaEyeSlash } from 'react-icons/fa';



const GeneralData = () => {
    const [visible, setVisible] = useState(false);
    const [password, setPassword] = useState('papas');

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    return (
        <div className="mb-4">
            <div className="flex text-white sm:px-5 sm:py-4  text-5xl  font-bold 
                lg:justify-start md:justify-start sm:justify-center justify-start mt-4">
                <h1 className=" pl-2 sm:pl-0 mr-2 text-title-profile w-[800px]">
                Perfil 
                </h1>
            </div>
            <div  className='flex flex-col lg:w-3/4 sm:ml-2'>

                <div className='flex lg:flex-row  flex-col justify-between'>
                    <div className='flex flex-col  ml-2'> 
                        <p className="font-bold mb-2 mt-2">Nombre </p>
                        <div className="text-2xl py-2 px-6 rounded-full bg-white w-60 ">
                            Papa
                        </div>
                    </div>
                    <div className='flex flex-col  ml-2'> 
                        <p className="font-bold mb-2 mt-2">Correo </p>
                        <div className="text-2xl py-2 px-6 rounded-full bg-white w-60 ">
                            papas
                        </div>
                    </div>
                </div>

                <div className='flex lg:flex-row  flex-col justify-between mt-2'>
                    <div className='flex flex-col  ml-2'> 
                        <p className="font-bold mb-2 mt-2"> Teléfono </p>
                        <div className="text-2xl py-2 px-6 rounded-full bg-white w-60 ">
                            231 205 2221
                        </div>
                    </div>
                    <div className='flex flex-col  ml-2'> 
                        <p className="font-bold mb-2 mt-2">Contraseña </p>
                        <div className="relative">
                            <input 
                                type={visible ? 'text' : 'password'} 
                                value={password} 
                                readOnly 
                                className="text-2xl py-2 px-6 rounded-full bg-white w-60 focus:outline-none"
                            />
                            <button 
                                onClick={toggleVisibility} 
                                className="absolute inset-y-0 right-0 flex items-center px-2"
                            >
                                {visible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GeneralData;





