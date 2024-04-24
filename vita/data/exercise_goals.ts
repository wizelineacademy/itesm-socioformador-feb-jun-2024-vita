import { NumericGoal, Goal, CategoricGoal } from "./datatypes/goal";

const actividadFisica: NumericGoal = {
    id: 1,
    title: "Realizar más actividad física",
    variable: "cantidad",
    measure: "veces",
    category: "exercise",
    min: 0,
    max: 10,
    constraint: "increase"
}

const bajarPeso: NumericGoal = {
    id: 2,
    title: "Bajar de peso",
    variable: "peso",
    measure: "kg",
    category: "exercise",
    min: 0,
    max: 200,
    constraint: "decrease",
    data: "weight"
}

const aumentarMuscular: NumericGoal = {
    id: 3,
    title: "Aumentar mi masa muscular",
    variable: "masa muscular",
    measure: "kg",
    category: "exercise",
    min: 0,
    max: 80,
    constraint: "increase",
    data: "muscularMass"
}

const enternarArea: CategoricGoal = {
    id: 4,
    title: "Entrenar más un área del cuerpo",
    variable: "área",
    category: "exercise",
    options: [
        "Hombros",
        "Trapecio",
        "Bíceps",
        "Pecho",
        "Abdominales",
        "Antebrazo",
        "Cuádriceps",
        "Tríceps",
        "Glúteos",
        "Espalda",
        "Isquiotibiales",
        "Gemelos",
        "Muslos",
        "Cuello"
    ]
}

export const exerciseGoals: Goal[] = [
    actividadFisica, 
    bajarPeso,
    aumentarMuscular,
    enternarArea
]