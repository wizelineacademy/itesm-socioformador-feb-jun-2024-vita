'use client'
import Decoration from '../../components/Decoration';
import type { NextPage } from 'next';
import React from 'react';
import { MdPlaylistAddCheck } from 'react-icons/md';
import { FaBed } from 'react-icons/fa';

const DailySleep: NextPage = () => {
    return (
        <div style={pageStyle}>
            <h1 style={headerStyle}>Sueño</h1>
            <Decoration pathname={''} /> {/* Using Decoration component here, adjust if necessary */}

            <div style={{ ...boxStyle, backgroundColor: '#191e54', gridRow: '2 / 3', gridColumn: '2 / 3' }}> {/* Horario De Ayer */}
                <h2 style={headingStyle}>Horario De Ayer</h2>
                <p style={textStyle}>22:00 - 8:00</p>
            </div>
            <div style={{ ...boxStyle, backgroundColor: '#403c74', gridRow: '3 / 4', gridColumn: '2 / 3' }}> {/* Autoevaluación */}
                <h2 style={headingStyle}>Autoevaluación</h2>
                <div style={{marginLeft: '300px' }}> {/* Adjust margin as needed */}
                    <MdPlaylistAddCheck size="50px" />
                </div>
            </div>
            <div style={{ ...boxStyle, backgroundColor: '#1f1a67', gridRow: '4 / 5', gridColumn: '2 / 3' }}> {/* Metas de Sueño */}
                <h2 style={headingStyle}>Metas de Sueño</h2>
                <div style={{marginLeft: '300px' }}> {/* Adjust margin as needed */}
                    <FaBed size="50px" />
                </div>
            </div>
            <div style={{ ...boxStyle, backgroundColor: '#383470', gridRow: '5 / 6', gridColumn: '1 / 2' }}> {/* Tip del Día */}
                <h2 style={headingStyle}>Tip del Día</h2>
                <div>
            
            
        </div>
            </div>
        </div>
        
    );
};

// Styles
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
    fontSize: '36px', // Larger font size for the page header
    color: '#fff',
    marginBottom: '20px',
    fontWeight: 'bold', // Make the header bold
    textAlign: 'left' // Align header text to the left
};

const boxStyle: React.CSSProperties = {
    borderRadius: '20px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', // Align items to the start
    alignItems: 'flex-start', // Align items to the start horizontally
    minHeight: '150px',
    color: '#FFFFFF',
    width: '100%',  // Ensuring boxes take full width of their columns
    textAlign: 'left' // Align text inside the box to the left
};

const headingStyle: React.CSSProperties = {
    fontSize: '35px', // Larger font size for headings
    fontWeight: 'bold', // Bold headings
    color: '#FFFFFF',
    textAlign: 'left', // Align heading text to the left
    paddingTop: '28px',
    paddingLeft: '14px'
};

const textStyle: React.CSSProperties = {
    fontSize: '28px', // Larger font size for text
    fontWeight: 'bold', // Normal weight for other texts
    color: '#FFFFFF',
    textAlign: 'left' // Align text to the left
};

export default DailySleep;