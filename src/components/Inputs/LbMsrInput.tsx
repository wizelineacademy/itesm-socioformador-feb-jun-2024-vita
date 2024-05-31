interface LbMsrInputInterface {
  color?: string
  label: string
  variable: string
  min: number
  max: number
  measure: string
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
}

//Label Measure Input
export const LbMsrInput = ({
  color = 'bg-custom-lightpurple',
  label,
  variable,
  min,
  max,
  measure,
  value,
  setValue,
}: LbMsrInputInterface) => {
  return (
    <div>
      <p className='mb-4 text-xl font-bold'>{label}</p>
      <div className='flex w-full items-center'>
        <input
          type='number'
          min={min}
          max={max}
          value={value}
          required
          onChange={(e) => {
            setValue(parseInt(e.target.value))
          }}
          className={`w-4/5 max-w-56 rounded-2xl border-none px-3 py-3 text-white outline-none md:max-w-80 md:py-4 ${color} placeholder-slate-300`}
          placeholder={variable}
        />
        <p className='ml-2 font-semibold text-white'>{measure}</p>
      </div>
    </div>
  )
}
