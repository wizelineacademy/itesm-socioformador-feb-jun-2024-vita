import { IdNameable } from './general'

export interface Goal extends IdNameable {
  id: number
  title: string // goal name
  category: string // sleep | exercise | nutrition
  variable?: string // value it is related to
  data?: string // related data health variable
}

export interface NumericGoal extends Goal {
  measure?: string
  min?: number
  max?: number
  constraint?: 'increase' | 'decrease'
}

export interface CategoricGoal extends Goal {
  options: string[]
}

export const isNumericGoal = (goal: Goal) => {
  return 'min' in goal
}

export const isCategoricalGoal = (goal: Goal) => {
  return 'options' in goal
}
