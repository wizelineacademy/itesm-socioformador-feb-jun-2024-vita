'use client'

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoIosArrowForward } from 'react-icons/io';
import { faAngleRight, faLightbulb, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FaHeart, FaComments, FaCircle, FaAngleRight,FaSuitcase , FaDumbbell , FaPercent} from 'react-icons/fa';
import Link from 'next/link';
import axios from  "axios"
import Swal from 'sweetalert2';

interface HealthData {
  idUserDetail: number;
  idUser: number;
  sex: string;
  weight: number;
  height: number;
  birthDate: string;
  bodyFat: number;
  muscularMass: number;
}

const Home = () => {

  const [isOpen, setIsOpen] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true); 
  const [userData, setUserData] = useState<HealthData | null>(null);

  const getData = async () => {
    try {
        const response = await axios.get("/api/healthdata");
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


  const toggleContent = () => {
    setIsOpen(!isOpen);
  };


  // Función para manejar el cambio de estado en pantallas pequeñas
  const handleToggle2 = () => {
    setIsOpen2(!isOpen2);
  };

  // Define an array of suggestions
  const suggestions = [
    "¡Come más frutas y verduras!",
    "¡Sal a dar un paseo!",
    "¡Toma más agua!",
    "¡Hoy practica Mindfullness por 10 minutos!",
    "¡Recuerda dormir 7-8 horas diarias!"
  ];

  // Function to generate a random suggestion
  const generateRandomSuggestion = () => {
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    return suggestions[randomIndex];
  };

  // State to hold the current random suggestion
  const [randomSuggestion, setRandomSuggestion] = useState(generateRandomSuggestion());

  // Function to generate a new random suggestion
  const handleGenerateSuggestion = () => {
    const newRandomSuggestion = generateRandomSuggestion();
    setRandomSuggestion(newRandomSuggestion);
  };

  return (
    <div className="mb-4">
      <div className="flex text-white sm:px-5 sm:py-4  text-5xl  font-bold 
        lg:justify-start md:justify-start sm:justify-center justify-start mt-4">
        <h1 className=" pl-2 sm:pl-0 mr-2 text-home-title w-[800px]">
          Bienvenid@ a
          <span className="text-7xl ml-4 flex flex-row mr-24 justify-start">
            VITA
            <FaHeart size={60}  className="text-home-title justify-end"/>
          </span>
        </h1>
       
      </div>
      

      <div className="flex flex-col lg:flex-row   items-center justify-center">
        
        <div id="Izquierda" className="flex flex-col " > 

          <div className="hidden md:block bg-color-home2 h-[250px] w-[225px] mb-4 mt-4 pb-4 rounded-3xl">
            <h2 className="text-white font-bold text-2xl ml-4 mt-4">Recomendación del Día</h2>
            <div className="bg-color-home3 h-[120px] w-[185px] mx-4 mt-4 rounded-3xl flex items-center justify-between px-5">
              <p className="text-[#1D154A] text-lg">{randomSuggestion}</p>
              <button
                onClick={handleGenerateSuggestion}
                className="bg-transparent border-none cursor-pointer"
              >
                <FontAwesomeIcon icon={faLightbulb} color="#1D154A" size="lg" />
              </button>
            </div>
          </div>

          <div id="Preguntame" className="bg-color-home5 h-16 w-56 mt-4 rounded-full flex items-center justify-between px-4 
          transition-colors duration-300 ease-in-out hover:bg-color-home6">
            <FaComments size={24}color='white' className="ml-4 mb-2"  />
            <span className="text-white font-bold text-2xl">Pregúntame</span>
          </div>

          <div id="Perfil" className="bg-color-home5 h-16 w-56  mt-4 rounded-full flex items-center justify-between px-4
          transition-colors duration-300 ease-in-out hover:bg-color-home6">
            <span className="text-white font-bold text-2xl ml-3">Perfil</span>
            <FaCircle  size={32} color='white' className="ml-4 mb-2"  />
          </div>
  
        </div>

        <div id="Centro" className="flex flex-col" >
        <Link href="/home/generalData"> 
          <div className={`bg-color-home6 w-[190px] mx-4 rounded-3xl mt-4 
            transition-colors duration-300 ease-in-out hover:bg-color-home5`} >
            <div className="flex flex-col items-center justify-center ">
              <span className="flex flex-row">
              <h2 className="text-white font-bold text-2xl ml-4 mt-4 w-[120px]">Mis datos de salud</h2>
              <div className="lg:hidden mt-4">
                <button onClick={toggleContent} className="focus:outline-none">
                  <FontAwesomeIcon icon={isOpen ? faAngleDown : faAngleRight} size="2x" color="white" 
                  className="transition-transform duration-300 transform" />
                </button>
              </div>
              </span>
              
              <div className={`${!isOpen ? 'block' : 'hidden'}   lg:flex lg:flex-col items-center justify-center lg:mt-4`}>

                
                <div className="bg-white  py-2 px-4 w-[150px] mt-7 rounded-3xl ">
                  <div className="text-home-title flex flex-row justify-between">
                    <FaSuitcase size={30}  />
                    <p className="text-2xl ml-2 flex flex-row"> {userData && userData.weight} <span className="pl-2"> kg</span></p>  
                  </div>
                </div>
                <div className="bg-white  py-2 px-4 w-[150px] mt-7 rounded-3xl ">
                  <div className="text-home-title flex flex-row justify-between">
                    <IoIosArrowForward size={30}  />
                    <p className="text-2xl ml-2 flex flex-row"> {userData && userData.height} <span className="pl-2"> m</span></p>  
                  </div>
                </div>
                <div className="bg-white  py-2 px-4 w-[150px] mt-7 rounded-3xl ">
                  <div className="text-home-title flex flex-row justify-between">
                    <FaDumbbell size={30}  />
                    <p className="text-2xl ml-2 flex flex-row"> {userData && userData.muscularMass} <span className="pl-2"> kg</span></p>  
                  </div>
                </div>
                <div className="bg-white  py-2 px-4 w-[150px] mt-7 rounded-3xl ">
                  <div className="text-home-title flex flex-row justify-between">
                    <FaPercent size={30}  />
                    <p className="text-2xl ml-2 flex flex-row"> {userData && userData.bodyFat} <span className="pl-2"> kg</span></p>  
                  </div>
                </div>
                <div className=" justify-end mt-8" > 
                  
                </div>
              </div>
              
            </div>
          </div>
        </Link>
        </div>
          
        <div id="Derecha" className="flex flex-col lg:mr-6" >

          <div id="Dashboard" className=" flex flex-row bg-color-home7 h-[120px] w-[232px] rounded-3xl justify-between mt-4
           transition-colors duration-300 ease-in-out hover:bg-color-home2" >
            <h2 className="text-color-home6 font-bold text-2xl pl-4 mt-2 w-[120px] ">
              Mi Dashboard de Salud
            </h2> 
            <div className="flex flex-col mt-4 mr-8">
              <FaAngleRight  size={48}  color="#144154"   />
             
              <FaCircle
                color='white'
                size={32}
              />
            </div>
          </div>

          <div className=" flex flex-col items-center justify-center bg-color-home7 rounded-3xl mt-4 pb-2">
            <div className="flex flex-row items-center">
              <h2 className="text-color-home6 font-bold text-2xl pl-4 mt-2">Autoevaluación</h2>
              <span className=" lg:hidden ">
                <button className="  focus:outline-none ml-2" onClick={handleToggle2}>
                  <FontAwesomeIcon icon={!isOpen2 ? faAngleDown : faAngleRight} size="lg" className="transition-transform duration-300 transform"/>
                </button>
              </span>
              
            </div>
            

            <div className={`${!isOpen2 ? 'block' : 'hidden'}   lg:flex lg:flex-col items-center justify-center lg:mt-4`}>
             

                <div className="flex flex-row mt-2 p-1 w-[190px]  bg-white rounded-2xl justify-between
                transition-colors duration-300 ease-in-out hover:bg-color-home3">
                  <h2 className="text-color-home6 font-bold text-lg pl-2">Nutrición</h2>
                  <FaAngleRight  size={28}    />
                </div>
                <div className="flex flex-row mt-4 p-1 w-[190px]  bg-white rounded-2xl justify-between
                transition-colors duration-300 ease-in-out hover:bg-color-home3">
                  <h2 className="text-color-home6 font-bold text-lg pl-2">Ejercicio</h2>
                  <FaAngleRight  size={28}    />
                </div>
                <div className="flex flex-row mt-4 p-1  w-[190px]  bg-white rounded-2xl justify-between
                transition-colors duration-300 ease-in-out hover:bg-color-home3">
                  <h2 className="text-color-home6 font-bold text-lg pl-2 ">Sueño</h2>
                  <FaAngleRight  size={28}    />
                </div>

              
            </div>
          </div>

          <div id="Perfil" className="bg-color-home6 h-16 w-56 ml-4 mt-4 rounded-full flex items-center justify-between px-4
           transition-colors duration-300 ease-in-out hover:bg-color-home5">
            <span className="text-white font-bold text-lg ml-3">
              Vincular con aplicaciones
            </span>
            <FaAngleRight  size={48}  color="#fff"  className="ml-4 mb-2"  />
            
          </div>
        </div>

      </div>
      
    
    </div>
  );
};

export default Home;