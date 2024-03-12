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
          <div 
            className="
              flex 
              flex-row 
              items-center 
              justify-between
              gap-3
              md:gap-0
            "
          >
            <div className="flex items-center gap-8">
              <NavItem color="text-white" title="Inicio" />
              <NavItem color="text-white" title="Acerca De" />
              <NavItem color="text-white" title="¿Qué hacemos?" />
              <NavItem color="text-white" title="Únete a Vita" />
            </div>
            <div className="flex items-center gap-8">
              <NavItem color="text-white" title="Registrarse" href="/signup"/>
              <NavItem color="text-custom-red" title="Iniciar Sesión"   />
              
            </div>
              
          </div>
        </Container>
      </div>
   
    </div>
    );
  }
  
  
  export default Navbar;