import Container from "../Container";
import NavItem from "./NavItem";

import Link from 'next/link';

const Navbar = ({
  
  }) => {
    return ( 
      <div className="fixed w-full z-10 shadow-sm">
        <div
          className="
            py-4 
          "
        >
        <Container>
          <div className="flex flex-row items-center my-1.5 lg:justify-between  md:gap-3 flex-wrap"
          >
            <div className="flex items-center gap-8 font-notosans invisible lg:visible">
              <NavItem color="text-white" title="Inicio" href="#Home_Page"/>
              <NavItem color="text-white" title="Acerca De" href="#About_Page" />
              <NavItem color="text-white" title="¿Qué hacemos?" href="#Carrusel_Page" />s
              <NavItem color="text-white" title="Únete a Vita" href="#Unete_Page" />
            </div>
            <div className="flex items-center gap-8 font-notosans">
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