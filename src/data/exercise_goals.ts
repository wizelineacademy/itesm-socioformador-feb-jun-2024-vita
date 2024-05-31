import { NumericGoal, Goal, CategoricGoal } from './datatypes/goal'

export const exerciseAreas = [
  'Hombros',
  'Trapecio',
  'Bíceps',
  'Pecho',
  'Abdominales',
  'Antebrazo',
  'Cuádriceps',
  'Tríceps',
  'Glúteos',
  'Espalda',
  'Isquiotibiales',
  'Gemelos',
  'Muslos',
  'Cuello',
]

const actividadFisica: NumericGoal = {
  id: 1,
  title: 'Realizar más actividad física',
  variable: 'actividad_fisica',
  measure: 'veces',
  category: 'exercise',
  min: 0,
  max: 10,
  constraint: 'increase',
}

const bajarPeso: NumericGoal = {
  id: 2,
  title: 'Bajar de peso',
  variable: 'peso',
  measure: 'kg',
  category: 'exercise',
  min: 0,
  max: 200,
  constraint: 'decrease',
  data: 'weight',
}

const aumentarMuscular: NumericGoal = {
  id: 3,
  title: 'Aumentar mi masa muscular',
  variable: 'masa_muscular',
  measure: 'kg',
  category: 'exercise',
  min: 0,
  max: 80,
  constraint: 'increase',
  data: 'muscularMass',
}

const enternarArea: CategoricGoal = {
  id: 4,
  title: 'Entrenar más un área del cuerpo',
  variable: 'area_entrenar',
  category: 'exercise',
  options: exerciseAreas,
}

export const exerciseGoals: Goal[] = [
  actividadFisica,
  bajarPeso,
  aumentarMuscular,
  enternarArea,
]

export const exerciseQuestions: GoalRecord[] = [
  {
    id: 1,
    question: '¿Cuántas veces realizas ejercicio a la semana?',
    variable: 'actividad_fisica',
    measure: 'veces',
    min: 0,
    max: 10,
  },
  {
    id: 2,
    question: '¿Cual es tu peso actual?',
    variable: 'peso',
    measure: 'kg',
    min: 0,
    max: 200,
    data: 'weight',
  },
  {
    id: 3,
    question: '¿Cuál es tu masa muscular actual?',
    variable: 'masa_muscular',
    measure: 'kg',
    min: 0,
    max: 200,
    data: 'muscularMass',
  },
]
