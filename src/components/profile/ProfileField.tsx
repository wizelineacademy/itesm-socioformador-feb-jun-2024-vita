interface ProfileFieldProps {
  label: string
  value: string | null | undefined
  editMode: boolean
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  type?: 'text' | 'email'
  required?: boolean
  min?: string
  darkMode?: boolean // Nueva prop
}

const ProfileField: React.FC<ProfileFieldProps> = ({
  label,
  value,
  editMode,
  name,
  onChange,
  type = 'text',
  required = false,
  min,
  darkMode = false, // Valor predeterminado para darkMode
}) => {
  const inputClassNames = `w-${darkMode ? '70' : '[320px]'}  lg:w-${darkMode ? '[280px]' : '[320px]'} 
   rounded-full bg-${darkMode ? 'white' : 'input-home'} 
  px-6 py-2 text-2xl `

  return (
    <div className='ml-2 flex flex-col'>
      <p className='mb-2 mt-2 text-lg font-bold text-black'> {label}</p>

      {editMode ? (
        <input
          type={type}
          name={name}
          value={value || ''}
          onChange={onChange}
          className={inputClassNames}
          required={required}
          min={min}
        />
      ) : (
        <div className={inputClassNames}>
          <p
            className={` text-${darkMode ? 'lg' : '2xl'} text-2xl text-${darkMode ? 'gray-400' : 'black'} ${darkMode ? 'px-6 font-bold' : ''} `}
          >
            {value != null ? value : 'Sin datos'}
          </p>
        </div>
      )}
    </div>
  )
}

export default ProfileField
