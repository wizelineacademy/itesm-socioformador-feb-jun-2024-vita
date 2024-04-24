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