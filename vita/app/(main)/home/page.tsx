'use client'
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faComments, faCircle, faLightbulb } from '@fortawesome/free-solid-svg-icons';

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

  // useEffect hook to generate a random suggestion when the component mounts
  useEffect(() => {
    setRandomSuggestion(generateRandomSuggestion());
  }, []);

  return (
    <div className="flex">
      <div className="flex flex-col py-4 justify-start items-start" style={{ paddingLeft: '0px' }}>
        {/* Existing text */}
        <h1 className="text-5xl font-bold text-home-title">Bienvenid@ a</h1>
        <h2 className="text-6xl font-black text-home-title">VITA</h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#1D154A" viewBox="0 0 24 24" style={{ marginLeft: '200px', marginTop: '-35px' }}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>

        {/* Existing blue containers */}
        <div style={{ backgroundColor: '#2E7390', height: '225px', width: '225px', marginLeft: '10px', marginTop: '35px', borderRadius: '33px' }}>
          <h2 style={{ color: 'white', fontWeight: 'bold', fontSize: '26px', marginLeft: '23px', marginTop: '20px' }}>Recomendación del Día <FontAwesomeIcon icon={faLightbulb} color="#144154" style={{ marginLeft: '70px', marginBottom: '4px' }} /></h2>
          <div style={{ backgroundColor: '#BFEBFF', height: '120px', width: '185px', marginLeft: '20px', marginTop: '17px', borderRadius: '17px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 15px' }}>
            {/* Display the random suggestion with bigger and bolder text */}
            <p style={{ color: '#1D154A', fontSize: '20px', fontWeight: 'bold' }}>{randomSuggestion}</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#2D7593', height: '60px', width: '225px', marginLeft: '10px', marginTop: '27px', borderRadius: '63px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 15px' }}>
          {/* Chatting icon */}
          <FontAwesomeIcon icon={faComments} size="lg" color='white' style={{ marginLeft: '12px', marginBottom: '4px' }}  />
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2em' , marginRight: '40px'}}>Pregúntame</span>
        </div>
        <div style={{ backgroundColor: '#144154', height: '60px', width: '225px', marginLeft: '10px', marginTop: '44px', borderRadius: '63px' }}>
          <h2 style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2em', marginLeft: '20px' , marginTop: '20px'}}>Perfil</h2>
          <FontAwesomeIcon
            icon={faCircle}
            color='white'
            style={{
              position: 'relative', // Allows for positioning adjustments
              top: '-25px', // Moves the icon upwards; adjust the pixel value as needed
              marginLeft: '178px', // Keeps the icon to the right
              fontSize: '2em'
            }}
          />
        </div>
      </div>

      {/* Middle blue rectangle */}
      <div style={{
        backgroundColor: '#144154',
        height: '420px',
        width: '225px',
        alignSelf: 'center',
        marginLeft: '2px',
        borderRadius: '33px',
        marginTop: '177px',
        position: 'relative', // Add position relative to allow absolute positioning inside
      }}>
        <h2 style={{ color: 'white', fontWeight:'bold', marginTop:'30px',marginLeft:'15px', fontSize:'25px'}}>Mis datos de salud</h2>
        {/* Your white ovals here */}
        <div style={{ backgroundColor: 'white', height: '40px', width: '150px', marginLeft: '38px', marginTop: '30px', borderRadius: '63px' }}></div>
        <div style={{ backgroundColor: 'white', height: '40px', width: '150px', marginLeft: '38px', marginTop: '18px', borderRadius: '63px' }}></div>
        <div style={{ backgroundColor: 'white', height: '40px', width: '150px', marginLeft: '38px', marginTop: '18px', borderRadius: '63px' }}></div>
        <div style={{ backgroundColor: 'white', height: '40px', width: '150px', marginLeft: '38px', marginTop: '18px', borderRadius: '63px' }}></div>
        {/* FontAwesomeIcon */}
        <div style={{ position: 'absolute', bottom: '33px', left: '0', right: '0', textAlign: 'center' }}>
          <FontAwesomeIcon
            icon={faAngleRight}
            size="3x"
            color="white"
            style={{ marginTop: '-60px' }} // Adjusted margin to move the icon more upwards
          />
        </div>
      </div>

      {/* Container for right rectangles */}
      <div className="flex flex-col" style={{ marginLeft: '49px' }}>
        {/* First blue rectangle on the right */}
        <div style={{
          backgroundColor: '#94D8F3',
          height: '120px',
          width: '247px',
          borderRadius: '33px',
          marginTop: '190px',
        }}>
          <h2 style={{ color: '#144154', fontWeight: 'bold', fontSize: '23px', marginLeft: '30px' , marginTop: '20px'}}
          >Mi </h2>
          <h2 style={{ color: '#144154', fontWeight: 'bold', fontSize: '23px', marginLeft: '30px' , marginTop: '5px'}}
          >Dashboard</h2>
          <h2 style={{ color: '#144154', fontWeight: 'bold', fontSize: '23px', marginLeft: '30px' , marginTop: '5px'}}
          >de Salud</h2>
          <FontAwesomeIcon
            icon={faAngleRight}
            size="2x" // Size as required
            color="#144154" // Color as required
            style={{
              position: 'relative', // Allows for positioning adjustments
              top: '-85px', // Negative value to move the icon upwards
              marginLeft: '190px', // Keeps the icon to the right
            }}
          />
          <FontAwesomeIcon
            icon={faCircle}
            color='white'
            style={{
              position: 'relative', // Allows for positioning adjustments
              top: '-70px', // Moves the icon upwards; adjust the pixel value as needed
              marginLeft: '178px', // Keeps the icon to the right
              fontSize: '3em',
            }}
          />
        </div>

        {/* Second blue rectangle right below the first one */}
        <div style={{
          backgroundColor: '#94D8F3',
          height: '215px',
          width: '247px',
          borderRadius: '33px',
          marginTop: '30px', // Adjust the space between the rectangles
        }}>
          <h2 style={{ color: '#144154', fontWeight: 'bold', fontSize: '23px', marginLeft: '30px' , marginTop: '20px'}}>Autoevaluación</h2>
          <div style={{ backgroundColor: '#7AA5B6', height: '35px', width: '160px', marginLeft: '28px', marginTop: '18px', borderRadius: '10px' }}> 
            <h2 style={{ color: '#B8CED8', fontWeight: 'bold', fontSize: '20px', margin: '0 10px', position: 'relative', top: '5px' }}>Nutrición</h2>
            <FontAwesomeIcon icon={faAngleRight} size="2x" style={{ marginLeft: '170px', marginTop: '-140px' }} /> {/* Adjusted marginTop value */}
          </div>
          <div style={{ backgroundColor: '#7AA5B6', height: '35px', width: '160px', marginLeft: '28px', marginTop: '18px', borderRadius: '10px' }}> 
            <h2 style={{ color: '#B8CED8', fontWeight: 'bold', fontSize: '20px', margin: '0 10px', position: 'relative', top: '5px' }}>Ejercicio</h2>
            <FontAwesomeIcon icon={faAngleRight} size="2x" style={{ marginLeft: '170px', marginTop: '-120px' }} /> {/* Adjusted marginTop value */}
          </div>
          <div style={{ backgroundColor: '#7AA5B6', height: '35px', width: '160px', marginLeft: '28px', marginTop: '18px', borderRadius: '10px' }}>
            <h2 style={{ color: '#B8CED8', fontWeight: 'bold', fontSize: '20px', margin: '0 10px', position: 'relative', top: '5px' }}>Sueño</h2>
            <FontAwesomeIcon icon={faAngleRight} size="2x" style={{ marginLeft: '170px', marginTop: '-120px' }} /> {/* Adjusted marginTop value */}
          </div>
        </div>
        <div style={{ backgroundColor: '#144154', height: '60px', width: '225px', marginLeft: '10px', marginTop: '14px', borderRadius: '63px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 15px' }}>
          <h2 style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', margin: '0 10px' }}>Vincular con aplicaciones</h2>
          <FontAwesomeIcon
            icon={faAngleRight}
            size="2x" // Adjusted size for better fit within the div
            color="white"
            style={{ margin: '0 10px' }} // Adjusted margin for alignment
          />
        </div>
      </div>
    </div>
  );
};

export default Home;