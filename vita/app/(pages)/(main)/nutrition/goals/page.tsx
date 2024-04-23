"use client"

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
    <div className="h-screen overflow-auto bg-[#2C0521] p-4 text-white flex flex-col items-start justify-start space-y-4 pt-10">
      <h2 className="text-5xl font-bold mb-4">Mi Meta</h2>

      {!goal && (
        <>
          <p className="text-xl">No tienes ninguna meta configurada actualmente.</p>
          <button onClick={() => setShowDropdown(true)} className="mt-4 px-4 py-2 bg-blue-500 rounded-full text-xl">
            Crear Meta
          </button>
        </>
      )}

      {goal && (
        <>
          <p className="text-xl">Tu meta actual es: <span className="font-bold">{goal}</span></p>
          <button onClick={handleEditGoal} className="px-4 py-2 bg-yellow-400 rounded-full text-xl">
            Editar Meta
          </button>
        </>
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
