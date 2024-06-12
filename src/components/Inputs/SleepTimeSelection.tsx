interface SleepTimeInterface {
  time: string
  label: string
  day: string
  setTime: React.Dispatch<React.SetStateAction<string>>
  setDay: React.Dispatch<React.SetStateAction<string>>
}

export const SleepTimeSelection = ({
  time,
  label,
  day,
  setTime,
  setDay,
}: SleepTimeInterface) => {
  return (
    <div className='flex flex-col'>
      <label className='mb-4 text-xl font-bold'>{label}</label>

      <div className='flex gap-x-3'>
        <input
          className='bg-input-purple rounded-2xl px-2 py-3 text-white md:px-10'
          value={time}
          type='time'
          onChange={(e) => {
            setTime(e.target.value)
          }}
        />
        <button
          onClick={() => {
            setDay('Ayer')
          }}
          className={`${day === 'Ayer' ? 'bg-decoration-sleep-colordark' : 'bg-decoration-sleep-colorlight'} hover:bg-decoration-sleep-colordark rounded-2xl px-5 py-2 md:px-10`}
        >
          Ayer
        </button>
        <button
          onClick={() => {
            setDay('Hoy')
          }}
          className={`${day === 'Hoy' ? 'bg-decoration-sleep-colordark' : 'bg-decoration-sleep-colorlight'} hover:bg-decoration-sleep-colordark rounded-2xl px-5 py-2 md:px-10`}
        >
          Hoy
        </button>
      </div>
    </div>
  )
}
