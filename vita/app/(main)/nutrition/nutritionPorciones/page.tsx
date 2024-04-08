'use client'
import React, { useState } from 'react';
import { FaAppleAlt, FaCarrot, FaLeaf, FaDrumstickBite, FaGlassWhiskey, FaSeedling, FaIceCream, FaBacon } from 'react-icons/fa';
import Image from 'next/image';

//pantalla hecha por Sofia Regina Martinez Cantú

const numeros = [
    { number: 0, label: 'Frutas' },
    { number: 0, label: 'Verduras' },
    { number: 0, label: 'Leguminosas' },
    { number: 0, label: 'Carnes' },
    { number: 0, label: 'Leche' },
    { number: 0, label: 'Cereales' },
    { number: 0, label: 'Azúcares' },
    { number: 0, label: 'Grasas' },
];

const ColumnsWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex flex-row justify-start space-x-40 ml-6 mt-8">
        {children}
    </div>
);

interface ColumnProps {
    title: string;
    labels: string[];
    icons: JSX.Element[];
    values: number[];
    onValueChange: (index: number, value: number) => void;
    validationMessages: string[];
}

const Column: React.FC<ColumnProps> = ({ title, labels, icons, values, onValueChange, validationMessages }) => (
    <div>
        <h2 className="text-white text-xl font-bold mb-1">{title}</h2>
        <div className="flex flex-col">
            {labels.map((label, index) => (
                <div key={index} className="mb-6 relative">
                    {validationMessages[index] && (
                        <div className="text-red-500 text-sm mb-1 font-bold">{validationMessages[index]}</div>
                    )}
                    <label className="block text-white text-lg font-bold mb-1 ml-3">{label}</label>
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
                        {icons[index] && <div className="ml-6 mt-[-0.5rem]">{icons[index]}</div>}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Nutrition: React.FC = () => {
    const [values, setValues] = useState(numeros.map(c => c.number));
    const [validationMessages, setValidationMessages] = useState(Array(numeros.length).fill(''));
    const [statusMessage, setStatusMessage] = useState('');
    const [statusColor, setStatusColor] = useState('');

    const updateValue = (index: number, value: number) => {
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);

        const newMessages = [...validationMessages];
        newMessages[index] = (value >= 0 && value <= 10) ? '' : '¡Sólo se aceptan valores entre 0-10!';
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

    const iconsFirstColumn = [
        <FaAppleAlt className="text-white text-5xl" />,
        <FaCarrot className="text-white text-5xl" />,
        <FaLeaf className="text-white text-5xl" />,
        <FaDrumstickBite className="text-white text-5xl" />,
    ];
    const iconsSecondColumn = [
        <FaGlassWhiskey className="text-white text-5xl" />,
        <FaSeedling className="text-white text-5xl" />,
        <FaIceCream className="text-white text-5xl" />,
        <FaBacon className="text-white text-5xl" />,
    ];

    return (
        <div className="h-screen overflow-auto bg-[#2C0521]">
            <div className="pt-4 pr-4">
                <div className="flex items-center">
                    <div>
                        <h2 className="text-white text-5xl font-bold">Mis</h2>
                        <h2 className="text-white text-5xl font-bold">Porciones</h2>
                    </div>
                    <div className="ml-80 mr-4 mt-9">
                        <Image src="/Food.svg" alt="Imagen 2" width={45} height={45} />
                    </div>
                </div>
                <ColumnsWrapper>
                    <Column
                        title=""
                        labels={['Frutas', 'Verduras', 'Leguminosas', 'Carnes']}
                        icons={iconsFirstColumn}
                        values={values.slice(0, 4)}
                        onValueChange={(index, value) => updateValue(index, value)}
                        validationMessages={validationMessages.slice(0, 4)}
                    />
                    <Column
                        title=""
                        labels={['Leche', 'Cereales', 'Azúcares', 'Grasas']}
                        icons={iconsSecondColumn}
                        values={values.slice(4)}
                        onValueChange={(index, value) => updateValue(index + 4, value)}
                        validationMessages={validationMessages.slice(4)}
                    />
                </ColumnsWrapper>
                <div className="flex justify-end items-center mt-6 mr-40">
                    <span className={`font-bold text-lg pr-4 ${statusColor}`}>{statusMessage}</span>
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