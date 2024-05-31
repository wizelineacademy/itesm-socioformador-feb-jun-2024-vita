'use client'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import ListItemLink from '@/src/components/list/ListItemLink'
import RecipesContext from '@/src/context/ingredients'

const RecipesList = () => {
  const { state, setState } = useContext(RecipesContext)

  const [recipes, setRecipes] = useState<Recipe[]>([])

  const router = useRouter()

  const navigateToRecipe = (selected: string) => {
    const recipe = recipes.find((recipe) => recipe.name === selected)

    setState({
      ...state,
      selectedRecipe: recipe,
    })

    router.push(`/nutrition/recipes/list/detail`)
  }

  useEffect(() => {
    setRecipes(state.recipes)
  }, [state.recipes])

  return (
    <div className='ml-5 mr-5'>
      <h2 className={'mt-2 text-4xl font-semibold text-white md:mt-10'}>
        Recetas
      </h2>
      <div className='mt-5 flex w-full flex-wrap md:mx-auto md:items-center lg:my-10 lg:w-2/3'>
        {recipes &&
          recipes.map((recipe) => (
            <ListItemLink
              onClick={(e) => {
                navigateToRecipe(recipe.name)
              }}
              key={recipe.name}
              text={recipe.name}
            />
          ))}
      </div>
    </div>
  )
}

export default RecipesList
