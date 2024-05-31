'use client'
import { useRouter } from 'next/navigation'
import MainButton from '@/src/components/buttons/MainButton'
import { useContext, useState } from 'react'
import swal from 'sweetalert2'
import Swal from 'sweetalert2'
import axios from 'axios'
import RecipesContext from '@/src/context/ingredients'

const RecipesCalories = () => {
  const [calories, setCalories] = useState<number>(1500)
  const [proteins, setProteins] = useState<number>(50)
  const [carbohydrates, setCarbohydrates] = useState<number>(20)
  const [lipids, setLipids] = useState<number>(30)

  const { state, setState } = useContext(RecipesContext)

  const router = useRouter()

  const generatePrompt = () => {
    if (!calories || !proteins || !carbohydrates || !lipids) {
      swal.fire({
        title: 'Error',
        text: 'Debes completar todos los campos',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return ''
    }

    if (calories <= 0 || calories > 5000) {
      swal.fire({
        title: 'Error',
        text: 'La cantidad de calorías debe ser mayor a 0 y menor o igual a 5000',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return ''
    }

    if (
      proteins <= 0 ||
      proteins > 100 ||
      carbohydrates <= 0 ||
      carbohydrates > 100 ||
      lipids <= 0 ||
      lipids > 100
    ) {
      swal.fire({
        title: 'Error',
        text: 'Los porcentajes deben encontrarse en el formato correcto',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return ''
    }

    if (proteins + carbohydrates + lipids != 100) {
      swal.fire({
        title: 'Error',
        text: 'Los porcentajes deben sumar 100%',
        icon: 'error',
        confirmButtonText: 'OK',
      })
      return ''
    }

    const prompt = `Busco consumir ${calories} kcal, dividido en ${proteins}% de proteínas, ${carbohydrates}% de carbohidratos y ${lipids}% de lipidos.`

    const message = {
      role: 'user',
      content: prompt,
    }

    return message
  }

  const generateRecipes = async () => {
    try {
      const message = generatePrompt()

      if (message === '') {
        return
      }

      //add record
      const usageRecords = [
        {
          name: 'recipes_calories',
          detail: `${calories}`,
        },
      ]
      await axios.post('/api/feature_usage', { usageRecords })

      swal.fire({
        title: 'Cargando',
        text: 'Generando las recetas...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      const response = await axios.post('/api/recipes/calories', {
        message,
      })

      let data = response.data.content
      data = data.replaceAll('`', '')
      data = data.replace('json', '')

      const recipes = JSON.parse(data)

      setState({
        ...state,
        recipes,
      })

      router.push('/nutrition/recipes/list')
      swal.close()
    } catch (error) {
      console.log(error)
      swal.close()
      swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al generar las recetas. Inténtalo de nuevo',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  const data = [
    {
      name: 'Calorías',
      value: calories,
      changeFunction: setCalories,
      placeholder: 'Cantidad',
      label: 'kcal',
      max: 5000,
    },
    {
      name: 'Porcentaje de proteínas',
      value: proteins,
      changeFunction: setProteins,
      placeholder: 'Porcentaje',
      label: '%',
      max: 100,
    },
    {
      name: 'Porcentaje de carbohidratos',
      value: carbohydrates,
      changeFunction: setCarbohydrates,
      placeholder: 'Porcentaje',
      label: '%',
      max: 100,
    },
    {
      name: 'Porcentaje de lípidos',
      value: lipids,
      changeFunction: setLipids,
      placeholder: 'Porcentaje',
      label: '%',
      max: 100,
    },
  ]

  return (
    <div className='ml-5 mr-5'>
      <h2 className={'mt-2 text-4xl font-semibold text-white md:mt-10'}>
        Recetas
      </h2>
      <h3 className={'mt-5 text-xl text-white md:w-4/5 lg:w-3/5'}>
        Selecciona la cantidad de calorías que deseas consumir y los porcentajes
        por grupo
      </h3>
      <div className='mt-5 flex w-full flex-wrap md:items-center lg:my-10 lg:w-2/3'>
        {data.map((el) => (
          <div
            key={el.name}
            className='mb-5 flex w-full flex-col justify-center space-y-1 align-top sm:w-2/5 md:mt-2 lg:w-2/5'
          >
            <p className='mb-2 font-semibold text-white md:mb-3 md:max-w-40 lg:max-w-none'>
              {el.name}
            </p>
            <div className='flex items-center'>
              <input
                type='number'
                min={0}
                max={el.max}
                value={el.value}
                onChange={(e) => {
                  el.changeFunction(parseInt(e.target.value))
                }}
                className='w-3/5 max-w-56 rounded-2xl border-none bg-custom-lightpurple px-3 py-2 text-white placeholder-slate-300 outline-none'
                placeholder={el.placeholder}
              />
              <p className='ml-2 font-semibold text-white'>{el.label}</p>
            </div>
          </div>
        ))}

        <MainButton onClick={generateRecipes} text={'Continuar'} />
      </div>
    </div>
  )
}

export default RecipesCalories
