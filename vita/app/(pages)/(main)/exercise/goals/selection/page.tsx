import ColorList from "@/components/list/ColorList";
import { exerciseGoals } from "@/data/exercise_goals";

const GoalsSelectionPage = () => {

    return (
        <div className="p-4 text-white flex flex-col items-start justify-start space-y-4 pt-10 md:items-start">
            <h2 className="text-5xl font-bold mb-4">Mi Meta</h2>
            <p className="text-xl font-bold">Selecciona una meta de nutrición</p>
            <ColorList
                baseUrl="/exercise/goals/selection"
                baseColor="bg-mid-green"
                hoverColor="bg-dark-green"
                list={exerciseGoals}
            />
        </div>

    )
}

export default GoalsSelectionPage;