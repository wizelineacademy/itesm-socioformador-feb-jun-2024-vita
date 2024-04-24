 interface LbMsrInputInterface {
    color?: string,
    label: string,
    variable: string
    min: number
    max: number
    measure: string
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>;
 }
 
 export const LbMsrInput = ({
    color = "bg-custom-lightpurple",
    label,
    variable,
    min,
    max,
    measure,
    value,
    setValue
 }:LbMsrInputInterface) => {
    return (
        <div>
            <p className="text-xl font-bold mb-4">{label}</p>
            <div className="w-full flex items-center">
                <input
                    type="number"
                    min={min}
                    max={max}
                    value={value} 
                    required
                    onChange={(e) => {
                        setValue(parseInt(e.target.value))
                    }}
                    className={`w-4/5 max-w-56 md:max-w-80 px-3 py-3 md:py-4 rounded-2xl text-white border-none outline-none ${color} placeholder-slate-300`}
                    placeholder={variable}
                />
                <p className='ml-2 font-semibold text-white'>{measure}</p>
            </div>
        </div>
    )
 }