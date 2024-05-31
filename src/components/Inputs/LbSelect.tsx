 interface LbSelectInterface {
    color?: string
    label: string
    options: string[]
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>;
 }
 
 export const LbSelect = ({
    color = "bg-custom-lightpurple",
    label,
    options,
    value,
    setValue
 }:LbSelectInterface) => {
    return (
        <div>
            <p className="text-xl font-bold mb-4">{label}</p>
            <div className="w-full flex items-center">
                <select 
                    value={value} 
                    required
                    onChange={(e) => {
                        console.log(options)
                        setValue(e.target.value)
                    }}
                    className={`w-4/5 max-w-56 md:max-w-80 px-3 py-3 md:py-4 rounded-2xl text-white border-none outline-none ${color} placeholder-slate-300`}
                >
                    {options.map(option => (
                        <option  className="text-white" key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        </div>
    )
 }