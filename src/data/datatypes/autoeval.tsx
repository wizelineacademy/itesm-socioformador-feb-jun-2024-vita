export interface Metric {
    name: string
    value: number
}

export interface GoalMetric extends Metric {
    idGoal: number
}

export interface Record {
    name: string
    value: number
    category: string
}

export type ValueRecord = Pick<Record, "name" | "value">


export interface Autoevaluation {
    goalMetrics: GoalMetric[]
    featureMetrics: Metric[]
    records: Record[]
} 
