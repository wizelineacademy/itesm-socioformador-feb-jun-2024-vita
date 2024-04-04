import Navbar from "../components/navbar/Navbar";
import Information from '../components/information/Information';
import Button from "../components/Button";
import Image from 'next/image'
import About from '../(landing)/Landing_About'
import Unete from '../(landing)/unete'
const Landing = () => {
  return (
    <div className="200vh bg-gradient-custom flex flex-col">
        <Navbar />
        <div id="Container" className="flex justify-center items-center flex-wrap h-screen">
            <div id="Left Information" className=" w-3/8 flex-shrink-0 flex flex-col items-start px-20"> 
                <Information />
                <div className="pt-4">
                    <Button 
                        borderColor="border-custom-red"
                        label= "Regístrate" 
                        outline
                        big
                        onClick={() => {}}
                      
                    />  
                </div>
            </div>

            <div id="Right Image">
            <Image
                src="/heart.svg"
                width={500}
                height={500}
                alt="Picture of the author"
            />
            </div>
        </div>  
        <About />
        <Unete />
    </div>
  );
}

export default Landing;
