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


             


const Nutrition: FC = () => {
   

   

   

    return (
        
              <h2>"hey"</h2>  
    );
};

export default Nutrition;

  