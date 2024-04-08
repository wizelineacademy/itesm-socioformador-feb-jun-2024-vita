import Navbar from "../components/navbar/Navbar";
import Information from '../components/information/Information';
import Button from "../components/Button";
import Image from 'next/image'
import About from '../(landing)/Landing_About'
import Unete from '../(landing)/unete'
import Footer from '../(landing)/Footer'
import CarruseLanding from '../(landing)/carrusel'
import Home from '../(landing)/Home'

const Landing = () => {
  return (
    <div className=" bg-gradient-custom flex flex-col gap-3.5">
        <Navbar />
        <Home />
        <About />
        <CarruseLanding />
        <Unete />
        <Footer />
    </div>
  );
}

export default Landing;
