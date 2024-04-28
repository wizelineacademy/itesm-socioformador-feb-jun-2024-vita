'use client';
import Swal from 'sweetalert2';
import React, { useState, useEffect} from "react";
import axios from  "axios"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { UserData } from '@/data/datatypes/user';
import ToggleComponent from '@/components/information/toggle';

const Profile = () => {
    const [visible, setVisible] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    const getData = async () => {
        try {
            const response = await axios.get("/api/profile");
            const fetchedData = response.data;

            setUserData(fetchedData);
          
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: "Ocurrió un error al recuperar los datos",
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }; 

    useEffect(() => {
        getData();
    }, []);

    

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
                        <div className="text-2xl py-2 px-6 rounded-full bg-input-home  w-[320px] ">
                            {userData && userData.name}
                        </div>
                    </div>
                    <div className='flex flex-col  ml-2'> 
                        <p className="font-bold mb-2 mt-2">Correo </p>
                        <div className="text-2xl py-2 px-6 rounded-full bg-input-home    w-[320px] ">
                            {userData && userData.email}
                        </div>
                    </div>
                </div>

                <div className='flex lg:flex-row  flex-col justify-between mt-2'>
                    <div className='flex flex-col  ml-2'> 
                        <p className="font-bold mb-2 mt-2"> Teléfono </p>
                        <div className="text-2xl py-2 px-6 rounded-full bg-input-home  w-[320px]
                     ">
                            {userData && userData.phoneNumber}
                        </div>
                    </div>
                    <div className='flex flex-col  ml-2'> 
                        <p className="font-bold mb-2 mt-2">Tipo de Sangre </p>
                        <div className="text-2xl py-2 px-6 rounded-full bg-input-home  w-[320px] ">
                            O+
                        </div>
                    </div>
                </div>

            </div>

            <div>
            <div  className="mt-4  pl-2">
                <ToggleComponent title="Contacto ">
                    <div className="flex lg:flex-row flex-col justify-around"> 
                        <div className='flex  flex-col '> 
                            <p className="font-bold text-black text-lg py-2 px-6"> Nombre del contacto:</p>
                            <div className='py-2 px-6 rounded-full  lg:w-[280px] w-70 bg-white'> 
                                <p className="font-bold text-gray-400 text-lg"> pepe penas</p>
                            </div>
                        </div> 
                        <div className='flex  flex-col '> 
                            <p className="font-bold text-black text-lg py-2 px-6"> Teléfono del contacto:</p>
                            <div className='py-2 px-6 rounded-full lg:w-[280px] w-70 bg-white'> 
                                <p className="font-bold text-gray-400 text-lg"> 231 205 2221</p>
                            </div>
                        </div> 
                    </div>
                </ToggleComponent>

                <ToggleComponent title="Póliza">
                    <div className="flex lg:flex-row flex-col justify-around"> 
                        <div className='flex  flex-col '> 
                            <p className="font-bold text-black text-lg py-2 px-6"> Número del seguro:</p>
                            <div className='py-2 px-6 rounded-full lg:w-[280px] w-70 bg-white'> 
                                <p className="font-bold text-gray-400 text-lg"> 474657483t47389</p>
                            </div>
                        </div> 
                        <div className='flex  flex-col '> 
                            <p className="font-bold text-black text-lg py-2 px-6">Nombre de la aseguradora:</p>
                            <div className='py-2 px-6 rounded-full  lg:w-[280px] w-70 bg-white'> 
                                <p className="font-bold text-gray-400 text-lg"> Chubb</p>
                            </div>
                        </div> 
                    </div>
                </ToggleComponent>

                <ToggleComponent title="Alergías">
                <div className="flex lg:flex-row flex-col justify-around mb-2"> 
                        <div className='flex  flex-col '> 
                            <p className="font-bold text-black text-lg py-2 px-6"> Nombre de la alergía:</p>
                            <div className='py-2 px-6 rounded-full lg:w-[280px] w-70 bg-white'> 
                                <p className="font-bold text-gray-400 text-lg"> Polvo</p>
                            </div>
                        </div> 
                        <div className='flex  flex-col '> 
                            <p className="font-bold text-black text-lg py-2 px-6">Reacción alérgica:</p>
                            <div className='py-2 px-6 rounded-full   lg:w-[280px] w-70 bg-white'> 
                                <p className="font-bold text-gray-400 text-lg">Dolor de Cabeza</p>
                            </div>
                        </div> 
                </div>
                <div className="flex lg:flex-row flex-col justify-around mb-2"> 
                        <div className='flex  flex-col '> 
                            <p className="font-bold text-black text-lg py-2 px-6"> Nombre de la alergía:</p>
                            <div className='py-2 px-6 rounded-full lg:w-[280px]  w-70 bg-white'> 
                                <p className="font-bold text-gray-400 text-lg"> Polvo</p>
                            </div>
                        </div> 
                        <div className='flex  flex-col '> 
                            <p className="font-bold text-black text-lg py-2 px-6">Reacción alérgica:</p>
                            <div className='py-2 px-6 rounded-full  lg:w-[280px] w-70 bg-white'> 
                                <p className="font-bold text-gray-400 text-lg">Dolor de Cabeza</p>
                            </div>
                        </div> 
                </div>   
                </ToggleComponent>

                <ToggleComponent title="Discapacidades">
                    <div className='py-2 px-6 rounded-full lg:w-[280px] w-70 bg-white'> 
                        <p className="font-bold text-gray-400 text-lg"> Anorexia</p>
                    </div>
                </ToggleComponent>

                <ToggleComponent title="Enfermedades crónicas ">
                    <div className='py-2 px-6 rounded-full lg:w-[280px]  w-70 bg-white'> 
                        <p className="font-bold text-gray-400 text-lg"> Diabetes</p>
                    </div>
                </ToggleComponent>

                <ToggleComponent title="Medicinas">
                <div className="flex lg:flex-row flex-col justify-around mb-2"> 
                        <div className='flex  flex-col '> 
                            <p className="font-bold text-black text-lg py-2 px-6"> Nombre de la medicina:</p>
                            <div className='py-2 px-6 rounded-full lg:w-[280px] w-70 bg-white'> 
                                <p className="font-bold text-gray-400 text-lg"> Salbutamol</p>
                            </div>
                        </div> 
                        <div className='flex  flex-col '> 
                            <p className="font-bold text-black text-lg py-2 px-6">Vía de administración:</p>
                            <div className='py-2 px-6 rounded-full lg:w-[280px] w-70 bg-white'> 
                                <p className="font-bold text-gray-400 text-lg">Oral</p>
                            </div>
                        </div> 
                </div>
                <div className="flex lg:flex-row flex-col justify-around mb-2"> 
                        <div className='flex  flex-col '> 
                            <p className="font-bold text-black text-lg py-2 px-6"> Dosis:</p>
                            <div className='py-2 px-6 rounded-full lg:w-[280px] w-70 bg-white'> 
                                <p className="font-bold text-gray-400 text-lg"> 20 ml</p>
                            </div>
                        </div> 
                        <div className='flex  flex-col '> 
                            <p className="font-bold text-black text-lg py-2 px-6">Duración :</p>
                            <div className='py-2 px-6 rounded-full  lg:w-[280px] w-70 bg-white'> 
                                <p className="font-bold text-gray-400 text-lg">Cada 2 horas</p>
                            </div>
                        </div> 
                </div>   
                </ToggleComponent>

              
                </div>
            </div>
        </div>
    );
};

export default Profile;
