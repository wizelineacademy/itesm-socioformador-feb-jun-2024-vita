"use client"

import React, { useState } from 'react';

const SelfEvaluationPage = () => {
  const [progress, setProgress] = useState<number>(0);
  const [nutritionPlanAdherence, setNutritionPlanAdherence] = useState<number>(0);
  const [nutritionPlanUsefulness, setNutritionPlanUsefulness] = useState<number>(0);
  const [recipeGenerationUsefulness, setRecipeGenerationUsefulness] = useState<number>(0);
  const [currentGoal, setCurrentGoal] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleGoalSelect = (goal: string) => {
    setCurrentGoal(goal);
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

  return (
    <div style={{ backgroundColor: '#2C0521', color: 'white', padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Autoevaluación</h1>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Meta Actual</h2>
        <button onClick={() => setShowDropdown(!showDropdown)} style={{ fontSize: '1.25rem', fontWeight: 'bold', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
          {currentGoal || 'Seleccione meta'} ▼
        </button>
        {showDropdown && (
          <div style={{ position: 'absolute', zIndex: 10, backgroundColor: '#2C0521' }}>
            <div style={{ padding: '10px', cursor: 'pointer' }} onClick={() => handleGoalSelect('Bajar de peso')}>
              Bajar de peso
            </div>
            <div style={{ padding: '10px', cursor: 'pointer' }} onClick={() => handleGoalSelect('Aumentar masa muscular')}>
              Aumentar masa muscular
            </div>
          </div>
        )}
      </div>
      {currentGoal && (
        <>
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
        </>
      )}
    </div>
  );
};

export default SelfEvaluationPage;
