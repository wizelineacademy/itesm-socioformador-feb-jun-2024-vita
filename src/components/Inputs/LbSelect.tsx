interface LbSelectInterface {
  color?: string
  label: string
  options: string[]
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export const LbSelect = ({
  color = 'bg-custom-lightpurple',
  label,
  options,
  value,
  setValue,
}: LbSelectInterface) => {
  return (
    <div>
      <p className='mb-4 text-xl font-bold'>{label}</p>
      <div className='flex w-full items-center'>
        <select
          value={value}
          required
          onChange={(e) => {
            console.log(options)
            setValue(e.target.value)
          }}
          className={`w-4/5 max-w-56 rounded-2xl border-none px-3 py-3 text-white outline-none md:max-w-80 md:py-4 ${color} placeholder-slate-300`}
        >
          {options.map((option) => (
            <option className='text-white' key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
