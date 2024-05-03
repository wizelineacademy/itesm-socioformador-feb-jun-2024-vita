import { Exercise } from "@/data/datatypes/exercise";
import { ReactNode, createContext, useState } from "react";


interface ExercisesContextType {
    state: {
        exercises: Exercise[];
        selectedExercise: Exercise | undefined;
    };
    setState: React.Dispatch<React.SetStateAction<{
        exercises: Exercise[]
        selectedExercise: Exercise | undefined;
    }>>;
}

const DEFAULT_VALUE: ExercisesContextType = {
    state: {
        exercises: [],
        selectedExercise: undefined
    },
    setState: () => {}
}

const ExercisesContext = createContext<ExercisesContextType>(DEFAULT_VALUE);

export function ExercisesContextProvider({children}: {children: ReactNode}){
    const [state, setState] = useState(DEFAULT_VALUE.state);

    return(
        <ExercisesContext.Provider value={{state, setState}}>
            {children}
        </ExercisesContext.Provider>
    )
}

export default ExercisesContext;