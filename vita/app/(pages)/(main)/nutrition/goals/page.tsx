"use client"

import ButtonEvaluation from '@/components/buttons/ButtonEvaluation.';
import MainButton from '@/components/buttons/MainButton';
import React, { useState, useEffect } from 'react';

const GoalsPage = () => {
  const [goal, setGoal] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    const savedGoal = sessionStorage.getItem('goal');
    if (savedGoal) {
      setGoal(savedGoal);
    }
  }, []);

  const handleSelectGoal = (selectedGoal: string) => {
    setGoal(selectedGoal);
    sessionStorage.setItem('goal', selectedGoal); 
    setShowDropdown(false); 
  };

  const handleEditGoal = () => {
    setShowDropdown(true); 
  };

  return (
    <div className="h-screen overflow-auto bg-[#2C0521] p-4 text-white flex flex-col items-start justify-start space-y-4 pt-10 md:items-start">
      <h2 className="text-5xl font-bold mb-4">Mi Meta</h2>

      {!goal && (
        <div className='flex flex-col w-full gap-y-5 lg:items-start'>
          <p className="text-xl font-bold">No tienes ninguna meta configurada actualmente.</p>
          <ButtonEvaluation onClick={() => {setShowDropdown(true)}} text='Crear meta'/>
        </div>
      )}

      {goal && (
          <div className='flex flex-col w-full gap-y-5 lg:items-start'>
            <p className="text-xl font-bold">Tu meta actual es:</p>
            <p className='mt-5 py-3 pl-4 w-full max-w-[500px] rounded-2xl text-lg bg-custom-lightpurple'>{goal}</p>
            <ButtonEvaluation onClick={() => {setShowDropdown(true)}} text='Editar meta'/>
          </div>
      )}

      {showDropdown && (
        <div className="mt-4 flex flex-col">
          <button onClick={() => handleSelectGoal('Aumentar masa muscular')} className="text-left px-4 py-2 bg-purple-300 rounded-full text-xl">
            Aumentar masa muscular
          </button>
          <button onClick={() => handleSelectGoal('Bajar de peso')} className="mt-2 text-left px-4 py-2 bg-purple-300 rounded-full text-xl">
            Bajar de peso
          </button>
        </div>
      )}
    </div>
  );
};

export default GoalsPage;
