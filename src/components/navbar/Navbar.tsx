import Container from '../Container'
import NavItem from './NavItem'

const Navbar = ({}) => {
  return (
    <div className='fixed z-10 w-screen bg-slate-950 bg-opacity-30 shadow-sm'>
      <div className='py-4'>
        <Container>
          <div className='flex items-center justify-center md:justify-between'>
            <div className='font-notosans hidden gap-8 sm:flex md:flex'>
              <NavItem color='text-white' title='Inicio' href='#Home_Page' />
              <NavItem
                color='text-white'
                title='Acerca De'
                href='#About_Page'
              />
              <NavItem
                color='text-white'
                title='¿Qué hacemos?'
                href='#Carrusel_Page'
              />
              <NavItem
                color='text-white'
                title='Únete a Vita'
                href='#Unete_Page'
              />
            </div>
            <div className='font-notosans flex gap-8'>
              <NavItem color='text-white' title='Registrarse' href='/signup' />
              <NavItem
                color='text-custom-red'
                title='Iniciar Sesión'
                href='/login'
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
