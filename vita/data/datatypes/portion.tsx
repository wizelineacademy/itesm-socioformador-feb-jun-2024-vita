interface Indexable {
    [key: string]: number;
}

export interface Portion extends Indexable {
    fruits: number,
    vegetables: number,
    legumes: number,
    meat: number,
    milk: number,
    cereals: number,
    sugar: number,
    fat: number
}

export interface CaloriesPortion {
    [key: number]: Portion
}

export interface PlanPortions {
    increase: CaloriesPortion,
    decrease: CaloriesPortion
}

export interface GenderPortions {
    "M": PlanPortions,
    "F": PlanPortions
}

