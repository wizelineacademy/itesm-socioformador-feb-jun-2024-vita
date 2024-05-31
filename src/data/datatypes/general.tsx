export interface Identifiable {
  id: number
}

export interface Nameable {
  title: string
}

export interface IdNameable extends Identifiable, Nameable {}
