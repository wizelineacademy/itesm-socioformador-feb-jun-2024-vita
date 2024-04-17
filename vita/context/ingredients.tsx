import { ReactNode, createContext, useState } from "react";


interface RecipesContextType {
    state: {
        planRecipes: Recipe[];
        recipes: Recipe[];
        selectedRecipe: Recipe | undefined
    };
    setState: React.Dispatch<React.SetStateAction<{
        planRecipes: Recipe[]
        recipes: Recipe[];
        selectedRecipe: Recipe | undefined
    }>>;
}

const DEFAULT_VALUE: RecipesContextType = {
    state: {
        planRecipes: [],
        recipes: [],
        selectedRecipe: undefined
    },
    setState: () => {}
}

const RecipesContext = createContext<RecipesContextType>(DEFAULT_VALUE);

export function RecipesContextProvider({children}: {children: ReactNode}){
    const [state, setState] = useState(DEFAULT_VALUE.state);

    return(
        <RecipesContext.Provider value={{state, setState}}>
            {children}
        </RecipesContext.Provider>
    )
}

export default RecipesContext;