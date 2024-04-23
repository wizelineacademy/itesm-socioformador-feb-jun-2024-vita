const GoalsPage = () => {
    const goals = [
        "Subir de peso",
        "Bajar de peso",
        "Incorporar más grupos alimenticios",
        "Bajar mi porcentaje de grasa",
        "Aumentar mi masa muscular"
    ]


    return (
        <div className="bg-[#2C0521] p-4 text-white flex flex-col items-start justify-start space-y-4 pt-10 md:items-start">
            <h2 className="text-5xl font-bold mb-4">Mi Meta</h2>
            <p className="text-xl font-bold">Selecciona una meta de ejercicio</p>
            <div className="pt-3 w-full mx-auto flex flex-col justify-center gap-y-5">
                {goals.map(goal => (
                    <p className="w-full sm:w-4/5 rounded-full py-6 pl-10 font-bold bg-decoration-nutrition-colorlight hover:bg-decoration-nutrition-colordark hover:cursor-pointer" key={goal}>{goal}</p>
                ))}
            </div>
        </div>

    )
}

export default GoalsPage;