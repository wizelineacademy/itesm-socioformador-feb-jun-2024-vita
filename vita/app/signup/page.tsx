import React from "react";
import Information from "../components/information/Information";
import Button from "../components/Button";

const SignUp = () => {
  return (
    <div id="Background" className="min-h-screen bg-gradient-custom flex flex-col">

      <div id="Section" className="flex-1 flex flex-col lg:flex-row 
      md:flex-row justify-center items-center">
        <div id="Section-Information" className="lg:w-3/8 flex flex-col lg:items-start
         md:items-start sm:items-center md:px-10 lg:px-20 items-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white pt-2 
          lg:w-[500px] md:w-[300px] sm:w-[300px] w-[300px]">
            ¡No lo dudes más y haz tu cuenta ahora mismo!
          </h2>
          <span> 
            <Information />
          </span>
        </div>

        <div id="SignUp-Section" className="lg:w-5/8 flex flex-col items-center md:px-10
        mt-4 lg:mt-0 lg:ml-4 mr-16">

          <Button
            borderColor="border-custom-green"
            label="Regístrate"
            outline
            small
            onClick={() => {}}
          />

          <h3 className="text-white text-sm lg:text-lg font-bold leading-normal pt-2">
            ¿Ya tienes una cuenta?
            <span className="cursor-pointer hover:underline"> Iniciar sesión</span>
          </h3>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
