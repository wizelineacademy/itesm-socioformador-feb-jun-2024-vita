import { IdNameable } from "./general";

export interface Goal extends IdNameable {
    id: number,
    title: string,
    category: string,
    variable?: string,
    data?: string
}

export interface NumericGoal extends Goal {
    measure?: string,
    min?: number,
    max?: number,
    constraint?: "increase" | "decrease",
}

export interface CategoricGoal extends Goal {
    options: string[]
}

export const isNumericGoal = (goal: Goal) => {
    return "min" in goal;
}

export const isCategoricalGoal = (goal: Goal) => {
    return "options" in goal;
}