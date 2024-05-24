interface SleepTimeInterface {
    time: string,
    label: string,
    day: string,
    setTime: React.Dispatch<React.SetStateAction<string>>;
    setDay: React.Dispatch<React.SetStateAction<string>>;
 }
 
 export const SleepTimeSelection = ({
    time,
    label,
    day,
    setTime,
    setDay
 }:SleepTimeInterface) => {
    return (
        <div className="flex flex-col">
            <label className="text-xl font-bold mb-4">{label}</label>

            <div className="flex gap-x-3">
                <input
                    className="bg-input-purple text-white rounded-2xl py-3 px-2 md:px-10"
                    value={time}
                    type="time"
                    onChange={e => {
                       setTime(e.target.value) 
                    }}
                />
                <button 
                    onClick={() => {
                        setDay("Ayer")
                    }}
                    className={`${day === "Ayer" ? "bg-decoration-sleep-colordark" : "bg-decoration-sleep-colorlight"} rounded-2xl px-5 md:px-10 py-2 hover:bg-decoration-sleep-colordark`}>
                        Ayer
                </button>
                <button 
                    onClick={() => {
                        setDay("Hoy")
                    }}
                    className={`${day === "Hoy" ? "bg-decoration-sleep-colordark" : "bg-decoration-sleep-colorlight"} rounded-2xl px-5 md:px-10 py-2 hover:bg-decoration-sleep-colordark`}>
                        Hoy
                </button>                    
            </div>
        </div>
    )
 }