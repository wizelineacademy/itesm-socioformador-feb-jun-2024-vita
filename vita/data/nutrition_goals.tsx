import { Goal } from "./datatypes/goal";

export const nutritionGoals: Goal[] = [
    {
        id: 1,
        title: "Subir de peso",
        variable: "peso",
        measure: "kg",
        category: "nutrition",
        min: 0,
        max: 200
    },
    {
        id: 2,
        title: "Bajar de peso",
        variable: "peso",
        measure: "kg",
        category: "nutrition",
        min: 0,
        max: 200
    },
    {
        id: 3,
        title: "Incorporar más grupos alimenticios",
        category: "nutrition"
    }, 
    {
        id: 4,
        title: "Bajar mi porcentaje de grasa",
        variable: "porcentaje de grasa",
        measure: "%",
        category: "nutrition",
        min: 0,
        max: 60
    },
    {
        id: 5,
        title: "Aumentar mi masa muscular",
        variable: "masa muscular",
        measure: "kg",
        category: "nutrition",
        min: 0,
        max: 80
    }
]