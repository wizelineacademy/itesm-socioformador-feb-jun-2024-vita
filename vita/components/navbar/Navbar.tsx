import Container from "../Container";
import NavItem from "./NavItem";

import Link from 'next/link';

const Navbar = ({
  
  }) => {
    return ( 
      <div className="fixed w-screen z-10 shadow-sm bg-slate-950 bg-opacity-30">
        <div
          className="
            py-4 
          "
        >
        <Container>
          <div className="  flex items-center  md:justify-between justify-center   ">
            <div className="   gap-8 font-notosans hidden  md:flex sm:flex ">
              <NavItem color="text-white" title="Inicio" href="#Home_Page"/>
              <NavItem color="text-white" title="Acerca De" href="#About_Page" />
              <NavItem color="text-white" title="¿Qué hacemos?" href="#Carrusel_Page" />
              <NavItem color="text-white" title="Únete a Vita" href="#Unete_Page" />
            </div>
            <div className="flex  gap-8 font-notosans">
              <NavItem color="text-white" title="Registrarse" href="/signup"/>
              <NavItem color="text-custom-red" title="Iniciar Sesión" href="/login"  />
              
            </div>
              
          </div>
        </Container>
      </div>
   
    </div>
    );
  }
  
  
  export default Navbar;