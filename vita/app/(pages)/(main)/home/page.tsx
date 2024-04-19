'use client'
import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faLightbulb, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FaHeart, FaComments, FaCircle } from 'react-icons/fa';
import Link from 'next/link';


const Home = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [height, setHeight] = useState('420px'); // Altura inicial

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) { // Cambia 1024 por el punto de ruptura deseado
        setHeight(isOpen ? '80px' : '420px');
      } else {
        setHeight('420px');
      }
    };

    handleResize();


    window.addEventListener('resize', handleResize);

    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]); 

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };


  
   const [isOpen2, setIsOpen2] = useState(false); // Por defecto cerrado en pantallas pequeñas
  const [isLargeScreen, setIsLargeScreen] = useState(false); // Para verificar si es una pantalla grande

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
      if (window.innerWidth < 1024) {
        setIsOpen2(false); // Cerrar en pantallas pequeñas
      }
    };

    // Ejecutar una vez al inicio para establecer el estado inicial
    handleResize();

    // Agregar el event listener para manejar el cambio de tamaño de la ventana
    window.addEventListener('resize', handleResize);

    // Limpia el event listener en la limpieza del efecto
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const [tam, setTam] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  useEffect(() => {
    const handleResize = () => {
      setTam(window.innerWidth);
    };
  
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
  
    // Remove event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures this effect runs only once on component mount
  
  return (
    <div className="mb-4">
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

          <div id="Preguntame" className="bg-color-home5 h-16 w-56 ml-4 mt-4 rounded-full flex items-center justify-between px-4 
          transition-colors duration-300 ease-in-out hover:bg-color-home6">
            <FaComments size={24}color='white' className="ml-4 mb-2"  />
            <span className="text-white font-bold text-2xl">Pregúntame</span>
          </div>

          <div id="Perfil" className="bg-color-home5 h-16 w-56 ml-4 mt-4 rounded-full flex items-center justify-between px-4
          transition-colors duration-300 ease-in-out hover:bg-color-home6">
            <span className="text-white font-bold text-2xl ml-3">Perfil</span>
            <FaCircle  size={32} color='white' className="ml-4 mb-2"  />
          </div>

          
        </div>



        <div id="Centro" className="flex flex-col" >

        <div className={`bg-color-home6 w-[190px] mx-4 rounded-3xl mt-4 h-[80px] lg:h-[420px]`} style={{ height }}>
          <div className="flex flex-col items-center justify-center ">
            <span className="flex flex-row">
            <h2 className="text-white font-bold text-2xl ml-4 mt-4 w-[120px]">Mis datos de salud</h2>
            <div className="lg:hidden mt-4">
              <button onClick={toggleContent} className="focus:outline-none">
                <FontAwesomeIcon icon={!isOpen ? faAngleDown : faAngleRight} size="2x" color="white" className="transition-transform duration-300 transform" />
              </button>
            </div>
            </span>
            
            <div className={`${!isOpen ? 'block' : 'hidden'}   lg:flex lg:flex-col items-center justify-center lg:mt-4`}>
              <div className="bg-white p-6 w-[150px] mt-7 rounded-3xl"></div>
              <div className="bg-white p-6 w-[150px] mt-7 rounded-3xl"></div>
              <div className="bg-white p-6 w-[150px] mt-7 rounded-3xl"></div>
              <div className="bg-white p-6 w-[150px] mt-7 rounded-3xl"></div>
              <div className=" justify-end mt-8" > 
                
              </div>
            </div>
            
          </div>
        </div>

        </div>
          
        <div id="Derecha" className="flex flex-col lg:mr-6" >

          <div id="Dashboard" className=" flex flex-row bg-color-home7 h-[120px] w-[232px] rounded-3xl justify-between mt-4
           transition-colors duration-300 ease-in-out hover:bg-color-home3" >
            <h2 className="text-color-home6 font-bold text-2xl pl-4 mt-2 w-[120px] ">
              Mi Dashboard de Salud
            </h2> 
            <div className="flex flex-col mt-4 mr-8">
              <FontAwesomeIcon
              icon={faAngleRight}
              size="3x" 
              color="#144154"   
             />
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
                <button className=" focus:outline-none ml-2" onClick={handleToggle2}>
                  <FontAwesomeIcon icon={isOpen2 ? faAngleDown : faAngleRight} size="lg" className="transition-transform duration-300 transform"/>
                </button>
              </span>
              
            </div>
            {  tam >= 1024 && (
              <div>
                <div className="flex flex-row mt-2 p-1 w-[190px]  bg-white rounded-2xl justify-between
                transition-colors duration-300 ease-in-out hover:bg-color-home3">
                  <h2 className="text-color-home6 font-bold text-lg">Nutrición</h2>
                  <FontAwesomeIcon icon={faAngleRight} size="lg" />
                </div>
                <div className="flex flex-row mt-2 p-1 w-[190px]  bg-white rounded-2xl justify-between
                transition-colors duration-300 ease-in-out hover:bg-color-home3">
                  <h2 className="text-color-home6 font-bold text-lg">Ejercicio</h2>
                  <FontAwesomeIcon icon={faAngleRight} size="lg" />
                </div>
                <div className="flex flex-row mt-2 p-1  w-[190px]  bg-white rounded-2xl justify-between
                transition-colors duration-300 ease-in-out hover:bg-color-home3">
                  <h2 className="text-color-home6 font-bold text-lg">Sueño</h2>
                  <FontAwesomeIcon icon={faAngleRight} size="lg" />
                </div>
              </div>
            )}

            {  isOpen2 && (
              <div>
                <div className="flex flex-row mt-2 p-1 w-[190px]  bg-white rounded-2xl justify-between">
                  <h2 className="text-color-home6 font-bold text-lg">Nutrición</h2>
                  <FontAwesomeIcon icon={faAngleRight} size="lg" />
                </div>
                <div className="flex flex-row mt-4 p-1 w-[190px]  bg-white rounded-2xl justify-between">
                  <h2 className="text-color-home6 font-bold text-lg">Ejercicio</h2>
                  <FontAwesomeIcon icon={faAngleRight} size="lg" />
                </div>
                <div className="flex flex-row mt-4 p-1  w-[190px]  bg-white rounded-2xl justify-between">
                  <h2 className="text-color-home6 font-bold text-lg">Sueño</h2>
                  <FontAwesomeIcon icon={faAngleRight} size="lg" />
                </div>
              </div>
            )}
          </div>

          <div id="Perfil" className="bg-color-home6 h-16 w-56 ml-4 mt-4 rounded-full flex items-center justify-between px-4
           transition-colors duration-300 ease-in-out hover:bg-color-home5">
            <span className="text-white font-bold text-lg ml-3">
              Vincular con aplicaciones
            </span>
            <FontAwesomeIcon icon={faAngleRight} size="2x" color='white' className="ml-4 mb-2"  />
          </div>
        </div>

      </div>
      
    
    </div>
  );
};

export default Home;