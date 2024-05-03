'use client'
import Decoration from '../../components/Decoration';
import type { NextPage } from 'next';
import React from 'react';
import { MdPlaylistAddCheck } from 'react-icons/md';
import { FaBed } from 'react-icons/fa';

const DailySleep: NextPage = () => {
    // Array of 10 sleep recommendations
    const recommendations = [
        "Mantén un horario de sueño constante, incluso los fines de semana, acostándote y levantándote a la misma hora.",
        "Practica un ritual de relajación antes de dormir.",
        "Si tienes problemas para dormir, evita las siestas, especialmente por la tarde.",
        "Ejercítate diariamente.",
        "Evalúa tu habitación para asegurar una temperatura ideal, niveles de sonido y luz adecuados.",
        "Duerme en un colchón y almohadas cómodos.",
        "Utiliza luz brillante para ayudar a manejar tus ritmos circadianos.",
        "Evita el alcohol, los cigarrillos y comidas pesadas por la noche.",
        "Relaja tu mente antes de dormir leyendo o practicando ejercicios de relajación.",
        "Apaga los dispositivos electrónicos al menos 30 minutos antes de ir a la cama."
    ];

    // Determine which recommendation to display based on the current day of the month
    const date = new Date();
    const index = date.getDate() % recommendations.length; // Get a repeating index from 0 to 9

    return (
        <div style={pageStyle}>
            <h1 style={headerStyle}>Sueño</h1>
            
           
            <Decoration pathname={''} />

            <div style={{ ...rectangleStyle, backgroundColor: '#383470' }}>
                {/* New rectangle on top left corner */}
            </div>

            <div style={{ ...boxStyle, backgroundColor: '#191e54', gridRow: '2 / 3', gridColumn: '2 / 3', marginRight: '100px' }}>
                {/* Horario De Ayer */}
                <h2 style={headingStyle}>Horario de Ayer</h2>
                
            </div>
            <div style={{ ...boxxStyle, backgroundColor: '#403c74', gridRow: '3 / 4', gridColumn: '2 / 3', marginRight: '80px' }}>
                {/* Autoevaluación */}
                <h2 style={headingStyle}>Autoevaluación</h2>
                <div style={{ marginLeft: '350px', marginTop: '-40px',  }}> {/* Adjusted marginTop */}
                    <MdPlaylistAddCheck size="50px" />
                </div>
            </div>
            <div style={{ ...boxxStyle, backgroundColor: '#1f1a67', gridRow: '3 / 4', gridColumn: '2 / 3', marginRight: '100px', marginTop: '200px' }}>
                {/* Metas de Sueño */}
                <h2 style={headingStyle}>Metas de Sueño</h2>
                <div style={{ marginLeft: '350px', marginTop: '-40px',  }}> {/* Adjusted marginTop */}
                    <FaBed size="50px" />
                </div>
            </div>
            
            <h2 style={{ ...headingStyle, marginTop: '92px', marginLeft: '27px' }}>Tip del Día</h2>
            <div style={{ ...tipStyle, backgroundColor: '#201f3f', gridRow: '5 / 6', gridColumn: '1 / 2', position: 'absolute', top: '580px' }}>
                {/* Display the tip inside this div as a paragraph, adjusted for left alignment and larger font */}
                <p style={{ color: '#FFFFFF', fontSize: '20px', textAlign: 'left', margin: '10px 10px' }}>{recommendations[index]}</p>
                <div style={{ marginLeft: '319px', marginTop: '30px',  }}> {/* Adjusted marginTop */}
                    <FaBed size="50px" />
                </div>
            </div>
            
        </div>
    );
};


// Styles
const tipStyle: React.CSSProperties = {
    borderRadius: '43px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', // Align items to the start
    alignItems: 'flex-start', // Align items to the start horizontally
    minHeight: '0px', // Decreased minHeight for smaller rectangles
    color: '#FFFFFF',
    width: '430px',  // Adjusted width
    height: '180px',  // Adjusted height
    textAlign: 'left', // Align text inside the box to the left
    marginLeft: '50px'
};

const pageStyle: React.CSSProperties = {
    backgroundColor: '#131535',
    color: '#fff',
    minHeight: '100vh',
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Two columns
    gridTemplateRows: 'auto auto auto auto 1fr', // Five rows, the last one takes remaining space
    gap: '20px',
    alignItems: 'start'
};

const headerStyle: React.CSSProperties = {
    gridColumn: '1 / -1', // Span across all columns
    fontSize: '58px', // Increased font size for the page header
    color: '#fff',
    marginBottom: '20px',
    fontWeight: 'bold', // Make the header bold
    textAlign: 'left', // Align header text to the left
    marginLeft: '55px' // Move the header to the left
};

const boxStyle: React.CSSProperties = {
    borderRadius: '33px',
    padding: '20px',
    marginRight: '80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', // Align items to the start
    alignItems: 'flex-start', // Align items to the start horizontally
    minHeight: '0px', // Decreased minHeight for smaller rectangles
    color: '#FFFFFF',
    width: '500px', 
    height: '260px', // Ensuring boxes take full width of their columns
    textAlign: 'left' // Align text inside the box to the left
};
const boxxStyle: React.CSSProperties = {
    borderRadius: '33px',
    padding: '20px',
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', // Align items to the start
    alignItems: 'flex-start', // Align items to the start horizontally
    minHeight: '158px', // Decreased minHeight for smaller rectangles
    color: '#FFFFFF',
    width: '495px',  // Ensuring boxes take full width of their columns
    textAlign: 'left' // Align text inside the box to the left
};

const headingStyle: React.CSSProperties = {
    fontSize: '35px',
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'left',
    paddingTop: '40px', // Increased padding-top to move headings down
    paddingLeft: '8px'
};

const textStyle: React.CSSProperties = {
    fontSize: '28px', // Larger font size for text
    fontWeight: 'bold', // Normal weight for other texts
    color: '#FFFFFF',
    textAlign: 'left' // Align text to the left
};

const rectangleStyle: React.CSSProperties = {
    borderRadius: '80px',
    padding: '40px',
    marginTop: '20px',
    color: '#FFFFFF',
    width: '490px',
    height: '370px',
    textAlign: 'left',
    position: 'absolute', // Position the rectangle absolutely
    top: '100px', // Adjust top position
    left: '70px' // Adjust left position
};

export default DailySleep;