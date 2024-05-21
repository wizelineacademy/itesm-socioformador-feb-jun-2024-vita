"use client"

import React, { useState } from 'react';

const SelfEvaluationPage = () => {
  const [progress, setProgress] = useState(0);
  const [nutritionPlanAdherence, setNutritionPlanAdherence] = useState(0);
  const [nutritionPlanUsefulness, setNutritionPlanUsefulness] = useState(0);
  const [recipeGenerationUsefulness, setRecipeGenerationUsefulness] = useState(0);
  const [currentGoal, setCurrentGoal] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleGoalSelect = (goal: string) => {
  const handleGoalSelect = (goal) => {
    setCurrentGoal(goal);
    localStorage.setItem('currentGoal', goal);
    setShowDropdown(false);
  };

  const ratingButtonStyle = (number: number, stateValue: number) => ({
    width: '40px',
    height: '40px',
    lineHeight: '40px',
    display: 'inline-block',
    margin: '0 5px',
    borderRadius: '50%',
    border: '2px solid white',
    backgroundColor: stateValue === number ? 'green' : 'transparent',
    color: 'white',
    fontSize: '1.5rem',
    textAlign: 'center',
    cursor: 'pointer',
  });
  const handleSubmit = () => {
    console.log('Form data:', { currentGoal, progress, nutritionPlanAdherence, nutritionPlanUsefulness, recipeGenerationUsefulness });
  };

  return (
    <div className="bg-[#2C0521] text-white p-5">
      <h1 className="text-5xl font-bold">Autoevaluación</h1>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Meta Actual</h2>
        <button onClick={() => setShowDropdown(!showDropdown)} style={{ fontSize: '1.25rem', fontWeight: 'bold', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          {currentGoal || 'Seleccione meta'} ▼
        </button>
        {showDropdown && (
          <div className="absolute z-10 bg-[#2C0521]">
            <div className="p-2.5 cursor-pointer" onClick={() => handleGoalSelect('Bajar de peso')}>Bajar de peso</div>
            <div className="p-2.5 cursor-pointer" onClick={() => handleGoalSelect('Aumentar masa muscular')}>Aumentar masa muscular</div>
          </div>
        )}
      </div>
      <div>
        <p style={{ fontSize: '1.25rem' }}>¿Has tenido un progreso en tu meta?</p>
        {[1, 2, 3, 4, 5].map((number) => (
          <span key={number} style={ratingButtonStyle(number, progress)} onClick={() => setProgress(number)}>
            {number}
          </span>
        ))}
      </div>
      <div>
        <p style={{ fontSize: '1.25rem' }}>¿Qué tan bien estás siguiendo tu plan de nutrición?</p>
        {[1, 2, 3, 4, 5].map((number) => (
          <span key={number} style={ratingButtonStyle(number, nutritionPlanAdherence)} onClick={() => setNutritionPlanAdherence(number)}>
            {number}
          </span>
        ))}
      </div>
      <div>
        <p>¿Qué tan útiles han sido las funciones de generación de planes de nutrición?</p>
        {[1, 2, 3, 4, 5].map((number) => (
          <span key={`nutrition-plan-${number}`} style={ratingButtonStyle(number, nutritionPlanUsefulness)} onClick={() => setNutritionPlanUsefulness(number)}>
            {number}
          </span>
        ))}
      </div>
      <div>
        <p>¿Qué tan útiles han sido las funciones de generación de recetas?</p>
        {[1, 2, 3, 4, 5].map((number) => (
          <span key={`recipe-generation-${number}`} style={ratingButtonStyle(number, recipeGenerationUsefulness)} onClick={() => setRecipeGenerationUsefulness(number)}>
            {number}
          </span>
        ))}
      </div>
      <button style={{
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'purple',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
      }}>
        Continuar
      </button>
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
          {error && <p className="text-red-500">{error.message}</p>}
        </>
      )}
        </>
      )}
    </div>
  );
};

export default SelfEvaluationPage;
