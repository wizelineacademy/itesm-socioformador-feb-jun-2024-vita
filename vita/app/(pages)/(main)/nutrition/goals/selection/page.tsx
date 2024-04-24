import ColorList from "@/components/list/ColorList";
import { nutritionGoals } from "@/data/nutrition_goals";

const GoalsSelectionPage = () => {

    return (
        <div className="bg-[#2C0521] p-4 text-white flex flex-col items-start justify-start space-y-4 pt-10 md:items-start">
            <h2 className="text-5xl font-bold mb-4">Mi Meta</h2>
            <p className="text-xl font-bold">Selecciona una meta de nutrición</p>
            <ColorList
                baseUrl="/nutrition/goals/selection"
                baseColor="bg-decoration-nutrition-colorlight"
                hoverColor="bg-decoration-nutrition-colordark"
                list={nutritionGoals}
            />
        </div>

    )
}

export default GoalsSelectionPage;