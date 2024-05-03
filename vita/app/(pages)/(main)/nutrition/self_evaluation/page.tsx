"use client"

import React, { useState, useEffect } from 'react';
import { FaAngleRight } from 'react-icons/fa';

const SelfEvaluationPage = () => {
  const [progress, setProgress] = useState(0);
  const [nutritionPlanAdherence, setNutritionPlanAdherence] = useState(0);
  const [nutritionPlanUsefulness, setNutritionPlanUsefulness] = useState(0);
  const [recipeGenerationUsefulness, setRecipeGenerationUsefulness] = useState(0);
  const [currentGoal, setCurrentGoal] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleGoalSelect = (goal) => {
    setCurrentGoal(goal);
    localStorage.setItem('currentGoal', goal);
    setShowDropdown(false);
  };

  const handleSubmit = () => {
    console.log('Form data:', { currentGoal, progress, nutritionPlanAdherence, nutritionPlanUsefulness, recipeGenerationUsefulness });
  };

  return (
    <div className="bg-[#2C0521] text-white p-5">
      <h1 className="text-5xl font-bold">Autoevaluación</h1>
      <div>
        <h2 className="text-3xl font-bold">Meta Actual</h2>
        <button onClick={() => setShowDropdown(!showDropdown)} className="text-xl font-bold bg-transparent border-none cursor-pointer">
          {currentGoal || 'Seleccione meta'} <FaAngleRight className="inline" />
        </button>
        {showDropdown && (
          <div className="absolute z-10 bg-[#2C0521]">
            <div className="p-2.5 cursor-pointer" onClick={() => handleGoalSelect('Bajar de peso')}>Bajar de peso</div>
            <div className="p-2.5 cursor-pointer" onClick={() => handleGoalSelect('Aumentar masa muscular')}>Aumentar masa muscular</div>
          </div>
        )}
      </div>
      {currentGoal && (
        <>
          <div>
            <p className="text-xl">¿Has tenido un progreso en tu meta?</p>
            {[1, 2, 3, 4, 5].map((number) => (
              <button key={number} className={`w-10 h-10 rounded-full border-2 border-white text-center ${progress === number ? 'bg-green-500' : 'bg-transparent'}`} onClick={() => setProgress(number)}>
                {number}
              </button>
            ))}
          </div>
          <div>
            <p className="text-xl">¿Qué tan bien estás siguiendo tu plan de nutrición?</p>
            {[1, 2, 3, 4, 5].map((number) => (
              <button key={number} className={`w-10 h-10 rounded-full border-2 border-white text-center ${nutritionPlanAdherence === number ? 'bg-green-500' : 'bg-transparent'}`} onClick={() => setNutritionPlanAdherence(number)}>
                {number}
              </button>
            ))}
          </div>
          <div>
            <p>¿Qué tan útiles han sido las funciones de generación de planes de nutrición?</p>
            {[1, 2, 3, 4, 5].map((number) => (
              <button key={`nutrition-plan-${number}`} className={`w-10 h-10 rounded-full border-2 border-white text-center ${nutritionPlanUsefulness === number ? 'bg-green-500' : 'bg-transparent'}`} onClick={() => setNutritionPlanUsefulness(number)}>
                {number}
              </button>
            ))}
          </div>
          <div>
            <p>¿Qué tan útiles han sido las funciones de generación de recetas?</p>
            {[1, 2, 3, 4, 5].map((number) => (
              <button key={`recipe-generation-${number}`} className={`w-10 h-10 rounded-full border-2 border-white text-center ${recipeGenerationUsefulness === number ? 'bg-green-500' : 'bg-transparent'}`} onClick={() => setRecipeGenerationUsefulness(number)}>
                {number}
              </button>
            ))}
          </div>
          <button onClick={handleSubmit} className="mt-5 p-2.5 text-xl font-bold bg-purple-700 rounded-full border-none cursor-pointer">
            Continuar
          </button>
        </>
      )}
    </div>
  );
};

export default SelfEvaluationPage;
