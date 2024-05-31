'use client'

import React, { useContext, useEffect, useState } from 'react'
import RecipesContext from '@/src/context/ingredients'
import { useRouter } from 'next/navigation'
import PlanItemLink from '@/src/components/list/PlanItemLink'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Portion } from '@/src/data/datatypes/portion'

/**
 * @author: Bernardo de la Sierra
 * @version 2.0.0
 * Component representing the Nutrition Home page
 */
const NutritionalPlan = () => {
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

  //order recipes based on mealtime
  const orderRecipes = (recipes: Recipe[]) => {
    const desayuno = recipes.filter(
      (recipe) => recipe.mealtime?.toLocaleLowerCase() === 'desayuno',
    )
    const comida = recipes.filter(
      (recipe) => recipe.mealtime?.toLocaleLowerCase() === 'comida',
    )
    const snack = recipes.filter(
      (recipe) => recipe.mealtime?.toLocaleLowerCase() === 'snack',
    )
    const cena = recipes.filter(
      (recipe) => recipe.mealtime?.toLocaleLowerCase() === 'cena',
    )
    const orderedRecipes = [...desayuno, ...comida, ...snack, ...cena]
    return orderedRecipes
  }

  const generateRecipes = async (prompt: string) => {
    try {
      if (!prompt || prompt === '') {
        return
      }

      //add record
      const usageRecords = [
        {
          name: 'recipes_plan',
          detail: `Generadas a partir de mis porciones`,
        },
      ]
      await axios.post('/api/feature_usage', { usageRecords })

      Swal.fire({
        title: 'Cargando',
        text: 'Generando las recetas...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      const message = {
        role: 'user',
        content: prompt,
      }

      const response = await axios.post('/api/recipes/plan', {
        message,
      })

      let data = response.data.content

      data = data.replaceAll('`', '')
      data = data.replace('json', '')

      const recipes = JSON.parse(data)

      setState({
        ...state,
        planRecipes: recipes,
      })
      setRecipes(orderRecipes(recipes))

      Swal.close()
    } catch (error: any) {
      console.log(error)
      Swal.close()
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al generar las recetas. Inténtalo de nuevo',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  const generatePrompt = (portions: Portion) => {
    return `frutas: ${portions.fruits},
      verduras: ${portions.vegetables}
      legumbres: ${portions.legumes}
      carne: ${portions.meat}
      leche: ${portions.milk}
      cereales: ${portions.cereals}
      azúcares: ${portions.sugar}
      grasas: ${portions.fat}
    `
  }

  const getPortions = async () => {
    try {
      const response = await axios.get('/api/portions')
      const data = response.data

      if (!data) {
        //return if portions have not been entered yet
        Swal.fire({
          title: 'Recuerda',
          text: 'Debes ingresar tus porciones antes de generar un plan nutricional',
          icon: 'info',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/nutrition')
          }
        })
        return
      }

      const prompt = generatePrompt(data)
      return prompt
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al recuperar las porciones',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return ''
    }
  }

  useEffect(() => {
    if (state.planRecipes.length > 0) {
      setRecipes(orderRecipes(state.planRecipes))
    } else {
      getPortions().then((res) => {
        generateRecipes(res ?? '')
      })
    }
  }, [])

  return (
    <>
      <div className='ml-5 mr-5'>
        <h2 className={'mt-2 text-4xl font-semibold text-white md:mt-10'}>
          Mi plan nutricional
        </h2>
        <div className='mt-5 flex w-full flex-wrap md:mx-auto md:items-center lg:my-10 lg:w-2/3'>
          {recipes &&
            recipes.map((recipe) => (
              <PlanItemLink
                onClick={(e) => {
                  navigateToRecipe(recipe.name)
                }}
                key={recipe.name}
                content={recipe.name}
                tag={recipe.mealtime ?? ''}
              />
            ))}
        </div>
      </div>
    </>
  )
}

export default NutritionalPlan
