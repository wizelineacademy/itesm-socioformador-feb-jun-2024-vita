import React from 'react'
import Home from '../../../components/Home'
import Navbar from '../../../components/navbar/Navbar'
import CarruseLanding from '../../../components/carusel/carrusel'
import Unete from '../../../components/landing/unete'
import Footer from '../../../components/Footer'
import About from '../../../components/landing/Landing_About'

const Landing = () => {
  return (
    <div className='flex flex-col justify-between bg-gradient-custom'>
      <Navbar />
      <div id='Spacer' className='h-20'></div>
      <div id='Home_Page' className='sm:mb-12'>
        <Home />
      </div>
      <div id='About_Page'>
        <About />
      </div>
      <div
        id='Carrusel_Page'
        className='flex flex-col items-center justify-center'
      >
        <h1 className='lg:7xl mb-5 text-center text-5xl font-bold text-white sm:mt-3.5 sm:text-6xl md:mt-1.5 md:text-6xl'>
          ¿Qué Hacemos?
        </h1>
        <div className='h-0.5 w-80 bg-rose-300'></div>
        <CarruseLanding />
      </div>
      <div id='Unete_Page'>
        <Unete />
      </div>
      <Footer />
    </div>
  )
}

export default Landing
