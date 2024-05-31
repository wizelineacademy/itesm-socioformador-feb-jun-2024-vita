'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const RecipeSelection = () => {
  const router = useRouter()

  const navigateToIngredients = () => {
    router.push('/nutrition/recipes/ingredients')
  }

  const navigateToCalories = () => {
    router.push('/nutrition/recipes/calories')
  }

  return (
    <div className='ml-5 mr-5'>
      <h2 className={'mt-2 text-4xl font-semibold text-white md:mt-10'}>
        Recetas
      </h2>
      <h3 className={'mt-5 text-xl text-white md:w-4/5 lg:w-3/5'}>
        Selecciona si deseas generar recetas en base a ingredientes o a la
        cantidad de calorías.
      </h3>
      <div className='mb-10 mt-5 flex flex-col justify-around md:flex-row'>
        <div
          onClick={navigateToIngredients}
          className='mx-auto mt-5 flex w-5/6 items-center justify-between rounded-3xl bg-custom-lightpurple px-5 py-2 font-medium text-white hover:cursor-pointer hover:bg-custom-extralightpurple md:h-60 md:w-2/5 md:flex-col-reverse md:justify-around lg:w-2/6'
        >
          <p className='text-lg md:mb-5 md:text-xl'>Ingredientes</p>
          <Image
            src='/icons/Food.svg'
            alt='Ingredientes'
            width={60}
            height={60}
            className='h-12 w-12 pr-2 md:h-32 md:w-32 lg:h-36 lg:w-36'
          />
        </div>
        <div
          onClick={navigateToCalories}
          className='mx-auto mt-5 flex w-5/6 items-center justify-between rounded-3xl bg-custom-lightpurple px-5 py-2 font-medium text-white hover:cursor-pointer hover:bg-custom-extralightpurple md:h-60 md:w-2/5 md:flex-col-reverse md:justify-around lg:w-2/6'
        >
          <p className='text-lg md:mb-5 md:text-xl lg:text-xl'>Calorías</p>
          <Image
            src='/icons/Calories.svg'
            alt='Calorías'
            width={60}
            height={60}
            className='h-12 w-12 pr-2 md:h-32 md:w-32 lg:h-36 lg:w-36'
          />
        </div>
      </div>
    </div>
  )
}

export default RecipeSelection
