import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  id: string
  label: string
  options: SelectOption[]
  disabled?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  big?: boolean
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  options,
  disabled,
  register,
  errors,
  big,
}) => {
  return (
    <div className='relative w-full'>
      <select
        id={id}
        disabled={disabled}
        {...register(id)}
        className={`peer ${big ? 'w-60 lg:w-[500px]' : 'w-60'} rounded-full bg-custom-blue px-4 pb-2 pt-6 font-light text-white outline-none transition disabled:cursor-not-allowed disabled:opacity-70 ${errors[id] ? 'focus:border-rose-500' : ''} `}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        className={`absolute left-4 top-5 z-10 origin-[0] -translate-y-3 transform text-xs text-white duration-150 ${errors[id] ? 'text-rose-500' : 'text-white'} `}
      >
        {label.includes('*') ? (
          <>
            {label.replace('*', '')}{' '}
            {/* Esto muestra el texto del label sin el asterisco (*) */}
            <span className='text-custom-red'>*</span>{' '}
            {/* Esto muestra solo el asterisco (*) con el color personalizado definido por la clase `text-custom-red` */}
          </>
        ) : (
          label // Si no hay asterisco, muestra el texto del label normalmente
        )}{' '}
        {/* Esto muestra solo el asterisco (*) con el color personalizado */}
      </label>
    </div>
  )
}

export default Select
