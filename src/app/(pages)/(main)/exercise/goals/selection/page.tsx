import ColorList from '@/src/components/list/ColorList'
import { exerciseGoals } from '@/src/data/exercise_goals'

const GoalsSelectionPage = () => {
  return (
    <div className='flex flex-col items-start justify-start space-y-4 p-4 pt-10 text-white md:items-start'>
      <h2 className='mb-4 text-5xl font-bold'>Mi Meta</h2>
      <p className='text-xl font-bold'>Selecciona una meta de nutrición</p>
      <ColorList
        baseUrl='/exercise/goals/selection'
        baseColor='bg-mid-green'
        hoverColor='bg-dark-green'
        list={exerciseGoals}
      />
    </div>
  )
}

export default GoalsSelectionPage
