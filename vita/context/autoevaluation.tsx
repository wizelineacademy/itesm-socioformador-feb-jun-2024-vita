import { ReactNode, createContext, useState } from "react";

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

interface AutoevaluationContextType {
    state: {
        goalMetrics: GoalMetric[]
        featureMetrics: Metric[]
        records: Record[]
    };
    setState: React.Dispatch<React.SetStateAction<{
        goalMetrics: GoalMetric[],
        featureMetrics: Metric[],
        records: Record[]
    }>>;
}

const DEFAULT_VALUE: AutoevaluationContextType = {
    state: {
        goalMetrics: [],
        featureMetrics: [],
        records: []
    },
    setState: () => {}
}

const AutoevaluationContext = createContext<AutoevaluationContextType>(DEFAULT_VALUE);

export function AutoevaluationContextProvider({children}: {children: ReactNode}){
    const [state, setState] = useState(DEFAULT_VALUE.state);

    return(
        <AutoevaluationContext.Provider value={{state, setState}}>
            {children}
        </AutoevaluationContext.Provider>
    )
}

export default AutoevaluationContext;