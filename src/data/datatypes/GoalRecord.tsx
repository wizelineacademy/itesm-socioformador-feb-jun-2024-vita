export interface GoalRecord {
  id: number
  question: string
  variable: string
  measure: string
  min: number
  max: number
  data?: string
}
