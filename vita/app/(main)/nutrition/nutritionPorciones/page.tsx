'use client'
import React, { useState, FC } from 'react';
import { FaAppleAlt, FaCarrot, FaLeaf, FaDrumstickBite, FaGlassWhiskey, FaSeedling, FaIceCream, FaBacon } from 'react-icons/fa';
import Image from 'next/image';

interface Numero {
    number: number;
    label: string;
}

const numeros: Numero[] = [
    { number: 0, label: 'Frutas' },
    { number: 0, label: 'Verduras' },
    { number: 0, label: 'Leguminosas' },
    { number: 0, label: 'Carnes' },
    { number: 0, label: 'Leche' },
    { number: 0, label: 'Cereales' },
    { number: 0, label: 'Azúcares' },
    { number: 0, label: 'Grasas' },
];

interface ColumnsWrapperProps {
    children: React.ReactNode;
}

const ColumnsWrapper: FC<ColumnsWrapperProps> = ({ children }) => (
    <div className="flex flex-wrap justify-start md:space-x-2 p-4" style={{ marginTop: '1rem' }}>
        {children}
    </div>
);

interface ColumnProps {
    labels: string[];
    icons: JSX.Element[];
    values: number[];
    onValueChange: (index: number, value: number) => void;
    validationMessages: string[];
}

const Column: FC<ColumnProps> = ({ labels, icons, values, onValueChange, validationMessages }) => (
    <div className="flex-1 mx-2"> 
        <div className="flex flex-col">
            {labels.map((label, index) => (
                <div key={index} className="mb-6 relative">
                    {validationMessages[index] && (
                        <div className="text-red-500 text-sm mb-1 font-bold">{validationMessages[index]}</div>
                    )}
                    <label className="block text-white text-lg font-bold mb-1">{label}</label>
                    <div className="flex items-center">
                        <input
                            type="number"
                            className="bg-[#6D5366] text-white border-none rounded-full pl-6 pr-4 py-5"
                            style={{ width: '300px' }}
                            value={values[index]}
                            onChange={(e) => onValueChange(index, Number(e.target.value))}
                            min="0"
                            max="10"
                        />
                        {icons[index] && <div className="ml-5 mt-[-0.5rem]">{icons[index]}</div>}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Nutrition: FC = () => {
    const [values, setValues] = useState<number[]>(numeros.map(c => c.number));
    const [validationMessages, setValidationMessages] = useState<string[]>(Array(numeros.length).fill(''));
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [statusColor, setStatusColor] = useState<string>('');

    const updateValue = (index: number, value: number) => {
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);

        const newMessages = [...validationMessages];
        newMessages[index] = value >= 0 && value <= 10 ? '' : '¡Sólo se aceptan valores entre 0-10!';
        setValidationMessages(newMessages);
    };

    const handleEdit = () => {
        const invalid = values.some(value => value < 0 || value > 10);
        if (invalid) {
            setStatusMessage('Revisa todos los campos de nuevo');
            setStatusColor('text-red-500');
        } else {
            setStatusMessage('Guardado con éxito');
            setStatusColor('text-green-500');
        }
    };

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
            <div className="pt-4 pr-4">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <h2 className="text-white text-5xl font-bold pl-4 ">Mis</h2>
                        </div>
                        <div className="flex items-center">
                            <h2 className="text-white text-5xl font-bold pl-4 ">Porciones</h2>
                            <Image src="/Food.svg" alt="Imagen 2" width={45} height={45} style={{ marginLeft: '20rem' }} />
                        </div>
                    </div>
                </div>
                <ColumnsWrapper>
                    <Column
                        labels={['Frutas', 'Verduras', 'Leguminosas', 'Carnes']}
                        icons={iconsFirstColumn}
                        values={values.slice(0, 4)}
                        onValueChange={updateValue}
                        validationMessages={validationMessages.slice(0, 4)}
                    />
                    <Column
                        labels={['Leche', 'Cereales', 'Azúcares', 'Grasas']}
                        icons={iconsSecondColumn}
                        values={values.slice(4)}
                        onValueChange={(index, value) => updateValue(index + 4, value)}
                        validationMessages={validationMessages.slice(4)}
                    />
                </ColumnsWrapper>
                <div className="flex justify-end items-center mt-6 mr-4 md:mr-40">
                    <span className={`font-bold text-lg ${statusColor}`} style={{ marginLeft: '-1.5rem', marginRight: '1rem' }}>{statusMessage}</span>
                    <button
                        className="bg-[#F84AC7] hover:bg-[#E033A6] text-white font-bold py-4 px-20 rounded-full"
                        onClick={handleEdit}
                    >
                        Editar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Nutrition;