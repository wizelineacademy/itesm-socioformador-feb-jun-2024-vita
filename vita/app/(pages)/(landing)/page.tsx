

import Button from "@/components/Button";
import Image from 'next/image'
import About from '../(landing)/Landing_About'
import Unete from '../(landing)/unete'
import Footer from '../(landing)/Footer'
import CarruseLanding from '../(landing)/carrusel'
import Home from '../(landing)/Home'
import Navbar from "@/app/components/navbar/Navbar";


const Landing = () => {
  return (
    <div className=" bg-gradient-custom flex flex-col gap-2.5">
        <Navbar />
        <div id="Spacer" className='w-screen h-20'>

        </div>
        <div id="Home_Page" className="mb-12">
          <Home />
        </div>
        <div id="About_Page">
          <About />
        </div>
        <div id="Carrusel_Page" className=" flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold mb-5 sm:text-6xl md:text-6xl lg:7xl sm:mt-3.5 md:mt-1.5 text-white text-center">¿Qué Hacemos?</h1>
          <div className="h-0.5 w-80 bg-rose-300"></div>
          <CarruseLanding />
        </div>
        <div id="Unete_Page">
          <Unete />
        </div>
        <Footer />
    </div>
  );
}

export default Landing;
