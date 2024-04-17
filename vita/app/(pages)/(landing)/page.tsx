

import Button from "@/components/buttons/Button";
import Image from 'next/image'
import About from '../../../components/landing/Landing_About'
import Unete from '../../../components/landing/unete'
import Footer from '../../../components/Footer'
import CarruseLanding from '../../../components/carusel/carrusel'
import Home from '../../../components/Home'
import Navbar from "@/components/navbar/Navbar";


const Landing = () => {
  return (
    <div className=" bg-gradient-custom flex flex-col gap-2.5">
        <Navbar />
        <div id="Spacer" className=' h-20'>

        </div>
        <div id="Home_Page" className="sm:mb-12">
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
