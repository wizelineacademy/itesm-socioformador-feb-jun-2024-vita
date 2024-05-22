import { NumericGoal } from "./datatypes/goal";

export const nutritionGoals: NumericGoal[] = [
    {
        id: 1,
        title: "Subir de peso",
        variable: "peso",
        measure: "kg",
        category: "nutrition",
        min: 0,
        max: 200,
        constraint: "increase",
        data: "weight"
    },
    {
        id: 2,
        title: "Bajar de peso",
        variable: "peso",
        measure: "kg",
        category: "nutrition",
        min: 0,
        max: 200,
        constraint: "decrease",
        data: "weight"
    },
    {
        id: 3,
        title: "Incorporar más grupos alimenticios",
        category: "nutrition"
    }, 
    {
        id: 4,
        title: "Bajar mi porcentaje de grasa",
        variable: "porcentaje_grasa",
        measure: "%",
        category: "nutrition",
        min: 0,
        max: 60,
        constraint: "decrease",
        data: "bodyFat"
    },
    {
        id: 5,
        title: "Aumentar mi masa muscular",
        variable: "masa_muscular",
        measure: "kg",
        category: "nutrition",
        min: 0,
        max: 80,
        constraint: "increase",
        data: "muscularMass"
    }
]

export const nutritionQuestions: GoalRecord[] = [
    {
        id: 1,
        question: "¿Cual es tu peso actual?",
        variable: "peso",
        measure: "kg",
        min: 0,
        max: 200,
        data: "weight"
    }, 
    {
        id: 2,
        question: "¿Cual es tu peso actual?",
        variable: "peso",
        measure: "kg",
        min: 0,
        max: 200,
        data: "weight"
    }, 
    {
        id: 4,
        question: "¿Cuál es tu porcentaje de grasa actual?",
        variable: "porcentaje_grasa",
        measure: "%",
        min: 0,
        max: 200,
        data: "bodyFat"
    },
    {
        id: 5,
        question: "¿Cuál es tu masa muscular actual?",
        variable: "masa_muscular",
        measure: "kg",
        min: 0,
        max: 200,
        data: "muscularMass"
    }
]