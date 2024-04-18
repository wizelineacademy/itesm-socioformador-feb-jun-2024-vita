'use client'
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faComments, faCircle, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FaHeart } from 'react-icons/fa';

const Home = () => {
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
    <>
      <div className="flex text-white sm:px-5 sm:py-4  text-5xl  font-bold 
        lg:justify-start md:justify-start sm:justify-center justify-start mt-4">
        <h1 className=" pl-2 sm:pl-0 mr-2 text-home-title w-[800px]">
          Bienvenid@ a
          <span className="text-8xl ml-4 flex flex-row mr-24 justify-start">
            VITA
            <FaHeart size={60}  className="text-home-title justify-end"/>
          </span>
        </h1>
       
      </div>
      

      <div className="flex flex-col lg:flex-row   items-center justify-center">
        
        <div id="Izquierda" className="flex flex-col " > 


          <div className="bg-color-home2 h-[250px] w-[225px] mx-4 mt-4 pb-4 rounded-3xl">
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

          <div id="Preguntame" className="bg-color-home5 h-16 w-56 ml-4 mt-4 rounded-full flex items-center justify-between px-4">
            <FontAwesomeIcon icon={faComments} size="lg" color='white' className="ml-4 mb-2"  />
            <span className="text-white font-bold text-2xl">Pregúntame</span>
          </div>

          <div id="Perfil" className="bg-color-home5 h-16 w-56 ml-4 mt-4 rounded-full flex items-center justify-between px-4">
            <span className="text-white font-bold text-2xl ml-3">Perfil</span>
            <FontAwesomeIcon icon={faCircle} size="lg" color='white' className="ml-4 mb-2"  />
            
          </div>

          
        </div>



        <div id="Centro" className="flex flex-col" >
          <div className="bg-color-home6 h-[420px] w-[190px]  mx-4  rounded-3xl mt-4">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-white font-bold text-2xl ml-4 mt-4 w-[120px] ">Mis datos de salud</h2>
            
              <div className="bg-white h-[40px] w-[150px] mt-4 rounded-3xl ">
              </div> 
              <div className="bg-white h-[40px] w-[150px]  mt-4 rounded-3xl ">
              </div>
              <div className="bg-white h-[40px] w-[150px] mt-4 rounded-3xl ">
              </div>
              <div className="bg-white h-[40px] w-[150px]  mt-4 rounded-3xl ">
              </div>
              <div className="mt-8" > 
              <FontAwesomeIcon
                icon={faAngleRight}
                size="3x"
                color="white"
              />
              </div>
            </div>
            
          </div>
        </div>
          
        <div id="Derecha" className="flex flex-col mr-6" >

          <div id="Dashboard "className=" flex flex-row bg-color-home7 h-[120px] w-[232px] rounded-3xl justify-between mt-4" >
            <h2 className="text-color-home6 font-bold text-2xl pl-4 mt-2 w-[120px] ">
              Mi Dashboard de Salud
            </h2> 
            <div className="flex flex-col mt-4 mr-8">
              <FontAwesomeIcon
              icon={faAngleRight}
              size="3x" 
              color="#144154"   
             />
              <FontAwesomeIcon
                icon={faCircle}
                color='white'
                size="2x" 
              />
            </div>
          </div>

          <div id="Enlaces" className="flex flex-col items-center justify-center bg-color-home7 h-[215px] w-[232px]
           rounded-3xl mt-4">
              <h2 className="text-color-home6 font-bold text-2xl pl-4 mt-2 ">
              Autoevaluación
              </h2> 
              <div className=" flex flex-row mt-4 p-1 bg-white  w-[190px] rounded-2xl justify-between">
                <h2 className="text-color-home6   font-bold text-lg "> 
                Nutrición
                </h2>
                <FontAwesomeIcon icon={faAngleRight} size="lg"  />
              </div>

              <div className=" flex flex-row mt-4 p-1 bg-white  w-[190px] rounded-2xl justify-between">
                <h2 className="text-color-home6   font-bold text-lg "> 
                Ejercicio
                </h2>
                <FontAwesomeIcon icon={faAngleRight} size="lg"  />
              </div>
              
              <div className=" flex flex-row mt-4 p-1 bg-white  w-[190px] rounded-2xl justify-between">
                <h2 className="text-color-home6   font-bold text-lg "> 
                Sueño
                </h2>
                <FontAwesomeIcon icon={faAngleRight} size="lg"  />
              </div>
          </div>

          <div id="Perfil" className="bg-color-home6 h-16 w-56 ml-4 mt-4 rounded-full flex items-center justify-between px-4">
            <span className="text-white font-bold text-lg ml-3">Vincular con aplicaciones</span>
            <FontAwesomeIcon icon={faAngleRight} size="2x" color='white' className="ml-4 mb-2"  />
          </div>


        </div>

      </div>
      
    
    </>
  );
};

export default Home;