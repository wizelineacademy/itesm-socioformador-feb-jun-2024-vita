'use client'
import React from "react";

const Home = () => {
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
        <div style={{ backgroundColor: '#2E7390', height: '225px', width: '225px', marginLeft: '10px', marginTop: '35px', borderRadius: '33px' }}></div>
        <div style={{ backgroundColor: '#2D7593', height: '60px', width: '225px', marginLeft: '10px', marginTop: '27px', borderRadius: '63px' }}></div>
        <div style={{ backgroundColor: '#144154', height: '60px', width: '225px', marginLeft: '10px', marginTop: '44px', borderRadius: '63px' }}></div>
      </div>

      {/* Middle blue rectangle */}
      <div style={{
        backgroundColor: '#144154',
        height: '420px',
        width: '225px',
        alignSelf: 'center',
        marginLeft: '2px',
        borderRadius: '33px',
        marginTop: '177px'
      }}></div>

      {/* Container for right rectangles */}
      <div className="flex flex-col" style={{ marginLeft: '49px' }}>
        {/* First blue rectangle on the right */}
        <div style={{
          backgroundColor: '#94D8F3',
          height: '120px',
          width: '247px',
          borderRadius: '33px',
          marginTop: '190px',
        }}></div>

        {/* Second blue rectangle right below the first one */}
        <div style={{
          backgroundColor: '#94D8F3',
          height: '215px',
          width: '247px',
          borderRadius: '33px',
          marginTop: '10px', // Adjust the space between the rectangles
        }}></div>
        <div style={{ backgroundColor: '#144154', height: '60px', width: '225px', marginLeft: '10px', marginTop: '14px', borderRadius: '63px' }}></div>
      </div>
    </div>
  );
};

export default Home;