import Navbar from "../components/navbar/Navbar";
import Information from '../components/information/Information';
import Button from "../components/Button";
const Landing = () => {
  return (
    <div className="h-screen bg-gradient-custom flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center flex-wrap">
            <div className="w-3/8 flex-shrink-0 flex flex-col items-start px-20 "> 
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

            <div className="flex-grow flex-wrap">
                <p className="text-lg text-white font-notosans">Image placeholder</p>
            </div>
        </div>  
    </div>
  );
}

export default Landing;
