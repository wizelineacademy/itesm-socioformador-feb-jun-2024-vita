'use client'
import React, { useState, FC, useEffect } from 'react';
import { FaAppleAlt, FaCarrot, FaLeaf, FaDrumstickBite, FaGlassWhiskey, FaSeedling, FaIceCream, FaBacon } from 'react-icons/fa';
import Image from 'next/image';
import Swal from 'sweetalert2';
import axios from 'axios';

interface Numero {
    number: string;
    label: string;
}

const numeros: Numero[] = [
    { number: "0", label: 'Frutas' },
    { number: "0", label: 'Verduras' },
    { number: "0", label: 'Leguminosas' },
    { number: "0", label: 'Carnes' },
    { number: "0", label: 'Leche' },
    { number: "0", label: 'Cereales' },
    { number: "0", label: 'Azúcares' },
    { number: "0", label: 'Grasas' },
];

interface ColumnsWrapperProps {
    children: React.ReactNode;
}

const ColumnsWrapper: FC<ColumnsWrapperProps> = ({ children }) => (
    <div className="w-full flex flex-wrap justify-start md:space-x-2 sm:w-3/5 lg:w-full" style={{ marginTop: '1rem' }}>
        {children}
    </div>
);

interface ColumnProps {
    labels: string[];
    icons: JSX.Element[];
    values: string[];
    edit: boolean;
    onValueChange: (index: number, value: string) => void;
    validationMessages: string[];
}

const Column: FC<ColumnProps> = ({ labels, icons, values, edit, onValueChange, validationMessages }) => (
    <div className="w-full lg:flex-1 lg:mr-3"> 
        <div className="flex flex-col">
            {labels.map((label, index) => (
                <div key={index} className="w-full mb-3 relative">
                    {validationMessages[index] && (
                        <div className="text-red-500 text-sm mb-1 font-bold">{validationMessages[index]}</div>
                    )}
                    <label className="block text-white text-lg font-bold mb-1">{label}</label>
                    <div className="flex items-center">
                        <input
                            type="number"
                            disabled={!edit}
                            className="w-4/5 bg-[#6D5366] text-white border-none rounded-full pl-6 pr-4 py-[0.7rem]"
                            value={values[index]}
                            onChange={(e) => onValueChange(index, e.target.value)}
                        />
                        {icons[index] && <div className="ml-5 mt-[-1rem]">{icons[index]}</div>}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Nutrition: FC = () => {

    const [values, setValues] = useState<string[]>(numeros.map(c => c.number));
    const [validationMessages, setValidationMessages] = useState<string[]>(Array(numeros.length).fill(''));
    const [edit, setEdit] = useState(false);


    const updateValue = (index: number, value: string) => {

        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);

        const newMessages = [...validationMessages];
        console.log(value)
        newMessages[index] =  value !== "" && Number(value) >= 0 && Number(value) <= 10 ? '' : 'Sólo se aceptan valores entre 0 y 10';
        setValidationMessages(newMessages);
    };

    const handleEdit = async () => {

        if(!edit){
            setEdit(true)
        } else {
            const invalid = values.some(value => value ==="" || Number(value) < 0 || Number(value) > 10);
            if (invalid) {
                Swal.fire({
                    title: 'Error',
                    text: "Los valores de las porciones deben encontrarse entre 0 y 10",
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else {
                await postPortions();
            }
        }

        
    };

    const postPortions =  async () => {

        try {
            const response = await axios.post("/api/portions", {
                fruits: values[0],
                vegetables: values[1], 
                milk: values[2], 
                legumes: values[3], 
                cereals: values[4], 
                meat: values[5],
                sugar: values[6], 
                fat: values[7]
            });

            console.log(response);

            Swal.fire({
                title: 'Éxito',
                text: 'Se han guardado las porciones con éxito',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            setEdit(false);
        } catch(error){
            Swal.fire({
                title: 'Error',
                text: "Ocurrió un error al guardar las porciones",
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } 
        
    }

    const labels = ["fruits", "vegetables", "milk", "legumes", "cereals", "meat", "sugar", "fat"]

    useEffect(() => {
      const getPortions = async () => {
        try {
            const response = await axios.get("/api/portions");
            const data = response.data;
            const newValues = [...values];
            for(let i = 0; i < labels.length; i++){
                newValues[i] = data[labels[i]];
            }
            setValues(newValues);
            console.log(newValues);
        } catch(error){
            Swal.fire({
                title: 'Error',
                text: "Ocurrió un error al recuperar las porciones",
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
      } 
      
      getPortions();
    }, [])

    const iconsFirstColumn: JSX.Element[] = [
        <FaAppleAlt className="text-white text-5xl" />,
        <FaCarrot className="text-white text-5xl" />,
        <FaLeaf className="text-white text-5xl" />,
        <FaDrumstickBite className="text-white text-5xl" />,
    ];
    const iconsSecondColumn: JSX.Element[] = [
        <FaGlassWhiskey className="text-white text-5xl" />,
        <FaSeedling className="text-white text-5xl" />,
        <FaIceCream className="text-white text-5xl" />,
        <FaBacon className="text-white text-5xl" />,
    ];

    return (
        <div className="h-screen overflow-auto bg-[#2C0521]">
            <div className="mt-4 ml-4 mr-4">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <h2 className="text-white text-4xl font-bold lg:text-5xl md:mt-5">Mis</h2>
                        </div>
                        <div className="flex items-center">
                            <h2 className="text-white text-4xl font-bold lg:text-5xl">Porciones</h2>
                            <Image src="/Food.svg" alt="Imagen 2" width={45} height={45} className='lg:w-24 lg:h-24 lg:pb-3' 
                            style={{ marginLeft: '2rem' }} />
                        </div>
                    </div>
                </div>

                {edit && 

                <>
                    <h3 className="mt-7 text-xl font-bold text-white">Porciones en base a calorías</h3>
                    <p className="mt-5 text-md leading-5 text-white max-w-[700px] lg:font-semibold">Ingresa la cantidad de calorías diarias que buscas consumir y se generará automáticamente un plan de acuerdo a estas</p>
                    <div className="flex flex-col items-center sm:items-start lg:flex-row lg:mt-5 lg:items-end lg:justify-start lg:space-x-3">
                        <div className='mt-5 flex flex-col justify-center align-top space-y-1 w-full sm:w-3/5 md:mt-2 lg:w-2/5 lg:max-w-[380px]'>
                            <p className="mb-2 font-semibold text-white md:mb-3 md:max-w-40 lg:max-w-none">Cantidad de calorías</p>
                            <div className="flex items-center">
                                <input
                                    type="number"
                                    min={0}
                                    max={5000}
                                    className='w-4/5 px-3 py-2 rounded-2xl max-w-[350px] text-white border-none outline-none bg-custom-lightpurple placeholder-slate-300' placeholder="Cantidad"/>
                                <p className='ml-2 font-semibold text-white'>kcal</p>
                            </div>
                        </div>
                        <button className='mt-5 w-4/5 text-white h-auto py-3 px-10 rounded-full font-bold bg-decoration-nutrition-colorlight hover:bg-decoration-nutrition-colordark sm:w-3/5 lg:w-auto lg:py-3 lg:px-12 xl:px-20'>Generar plan</button>
                    </div>

                    <hr className='mt-5 mx-auto w-full'/>
                    <p className="mt-5 text-md leading-5 text-white lg:font-semibold">O también puedes ingresarlas manualmente</p>
                </>
                
                }

                <ColumnsWrapper>
                    <Column
                        labels={['Frutas', 'Verduras', 'Leguminosas', 'Carnes']}
                        icons={iconsFirstColumn}
                        edit={edit}
                        values={values.slice(0, 4)}
                        onValueChange={updateValue}
                        validationMessages={validationMessages.slice(0, 4)}
                    />
                    <Column
                        labels={['Leche', 'Cereales', 'Azúcares', 'Grasas']}
                        edit={edit}
                        icons={iconsSecondColumn}
                        values={values.slice(4)}
                        onValueChange={(index, value) => updateValue(index + 4, value)}
                        validationMessages={validationMessages.slice(4)}
                    />
                </ColumnsWrapper>
                <div className="w-full flex flex-col items-center space-y-3 sm:items-start md:flex-row md:items-center md:space-y-0 md:space-x-3 md:mr-7 lg:justify-end lg:items-center mt-2 mb-5">
                    {edit &&
                        <button
                        className="w-4/5 bg-mid-red hover:bg-light-red text-white font-bold py-3 rounded-full sm:w-3/5 lg:max-w-72"
                        onClick={() => {setEdit(false)}}
                        >
                        Cancelar
                        </button>
                    }
                    <button
                        className="w-4/5 bg-decoration-nutrition-colorlight hover:bg-decoration-nutrition-colordark text-white font-bold py-3 rounded-full sm:w-3/5 lg:max-w-72"
                        onClick={handleEdit}
                    >
                        {edit ? "Guardar cambios" : "Editar"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Nutrition;