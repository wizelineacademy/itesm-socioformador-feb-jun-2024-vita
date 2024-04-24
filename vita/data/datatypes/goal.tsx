import { IdentifiableAndNameable } from "./general";

export interface Goal extends IdentifiableAndNameable {
    id: number,
    title: string,
    variable?: string,
    measure?: string,
    category: string,
    min?: number,
    max?: number,
    constraint?: "increase" | "decrease",
    data?: string
}