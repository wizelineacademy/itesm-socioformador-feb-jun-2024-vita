"use client"

<<<<<<< Updated upstream
import React, { useState } from 'react';

const SelfEvaluationPage = () => {
  const [progress, setProgress] = useState<number>(0);
  const [nutritionPlanAdherence, setNutritionPlanAdherence] = useState<number>(0);
  const [nutritionPlanUsefulness, setNutritionPlanUsefulness] = useState<number>(0);
  const [recipeGenerationUsefulness, setRecipeGenerationUsefulness] = useState<number>(0);
  const [currentGoal, setCurrentGoal] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleGoalSelect = (goal: string) => {
=======
import React, { useEffect, useState } from "react";
import axios from "axios";

const SelfEvaluationPage = () => {
  const [progress, setProgress] = useState(0);
  const [nutritionPlanAdherence, setNutritionPlanAdherence] = useState(0);
  const [nutritionPlanUsefulness, setNutritionPlanUsefulness] = useState(0);
  const [recipeGenerationUsefulness, setRecipeGenerationUsefulness] = useState(0);
  const [currentGoal, setCurrentGoal] = useState('');
  const [currentGoalId, setCurrentGoalId] = useState(null); 
  const [evaluations, setEvaluations] = useState([]);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/self_evaluation");
        setEvaluations(res.data);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    };

    const savedGoal = localStorage.getItem('currentGoal');
    if (savedGoal) {
      setCurrentGoal(savedGoal);
    }

    fetchData();
  }, []);

  const handleGoalSelect = (goal) => {
>>>>>>> Stashed changes
    setCurrentGoal(goal);
    setShowDropdown(false);
  };

<<<<<<< Updated upstream
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
=======
  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/self_evaluation", {
        idGoal: 1,
        name: currentGoal,
        grade: progress,
      });
      console.log("Evaluation submitted:", res.data);
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };
>>>>>>> Stashed changes

  return (
    <div style={{ backgroundColor: '#2C0521', color: 'white', padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Autoevaluación</h1>
      <div>
<<<<<<< Updated upstream
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
=======
        <h2 className="text-3xl font-bold">Meta Actual</h2>
        <button onClick={() => setShowDropdown(!showDropdown)} className="text-xl font-bold bg-transparent border-none cursor-pointer">
          {currentGoal || 'Seleccione meta'} ▼
        </button>
        {showDropdown && (
          <div className="absolute z-10 bg-[#2C0521] p-2 mt-2 rounded-lg shadow-lg">
            <div className="p-2 cursor-pointer hover:bg-[#381a3b]" onClick={() => handleGoalSelect('Bajar de peso')}>Bajar de peso</div>
            <div className="p-2 cursor-pointer hover:bg-[#381a3b]" onClick={() => handleGoalSelect('Aumentar masa muscular')}>Aumentar masa muscular</div>
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
          {error && <p className="text-red-500">{error.message}</p>}
        </>
      )}
>>>>>>> Stashed changes
    </div>
  );
};

export default SelfEvaluationPage;
