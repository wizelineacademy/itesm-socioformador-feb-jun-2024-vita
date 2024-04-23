"use client"

import ButtonEvaluation from '@/components/buttons/ButtonEvaluation.';
import React, { useState, useEffect } from 'react';

const GoalsPage = () => {
  const [goal, setGoal] = useState<string>('');

  useEffect(() => {
    const savedGoal = sessionStorage.getItem('goal');
    if (savedGoal) {
      setGoal(savedGoal);
    }
  }, []);

  return (
    <div className="bg-[#2C0521] p-4 text-white flex flex-col items-start justify-start space-y-4 pt-10 md:items-start">
      <h2 className="text-5xl font-bold mb-4">Mi Meta</h2>

      {!goal && (
        <div className='flex flex-col w-full gap-y-5 lg:items-start'>
          <p className="text-xl font-bold">No tienes ninguna meta configurada actualmente.</p>
          <ButtonEvaluation onClick={() => {}} text='Crear meta'/>
        </div>
      )}

      {goal && (
          <div className='flex flex-col w-full gap-y-5 lg:items-start'>
            <p className="text-xl font-bold">Tu meta actual es:</p>
            <p className='mt-5 py-3 pl-4 w-full max-w-[500px] rounded-2xl text-lg bg-custom-lightpurple'>{goal}</p>
            <ButtonEvaluation onClick={() => {}} text='Editar meta'/>
          </div>
      )}

    </div>
  );
};

export default GoalsPage;
