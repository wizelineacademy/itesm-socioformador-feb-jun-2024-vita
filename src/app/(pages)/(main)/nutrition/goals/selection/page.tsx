import ColorList from '@/src/components/list/ColorList'
import { nutritionGoals } from '@/src/data/nutrition_goals'

const GoalsSelectionPage = () => {
  return (
    <div className='flex flex-col items-start justify-start space-y-4 bg-[#2C0521] p-4 pt-10 text-white md:items-start'>
      <h2 className='mb-4 text-5xl font-bold'>Mi Meta</h2>
      <p className='text-xl font-bold'>Selecciona una meta de nutrición</p>
      <ColorList
        baseUrl='/nutrition/goals/selection'
        baseColor='bg-decoration-nutrition-colorlight'
        hoverColor='bg-decoration-nutrition-colordark'
        list={nutritionGoals}
      />
    </div>
  )
}

export default GoalsSelectionPage
