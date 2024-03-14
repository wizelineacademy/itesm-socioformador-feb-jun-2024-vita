import { 
    FieldErrors, 
    FieldValues, 
    UseFormRegister 
  } from "react-hook-form";
  
  interface SelectOption {
    value: string;
    label: string;
  }
  
  interface SelectProps {
    id: string;
    label: string;
    options: SelectOption[];
    disabled?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
  }
  
  const Select: React.FC<SelectProps> = ({
    id,
    label,
    options,
    disabled, 
    register,
    errors,
  }) => {
    return (
      <div className="w-full relative">
        <select
          id={id}
          disabled={disabled}
          {...register(id)}
          className={`
            peer
            w-60
            px-4
            pt-5
            pb-2
            font-light 
            bg-custom-blue
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-full
            text-white 
            ${errors[id] ? 'focus:border-rose-500' : ''}
          `}
        >
        
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <label 
          className={`
            absolute 
            text-sm
            duration-150 
            transform 
            -translate-y-3 
            top-5 
            z-10 
            origin-[0] 
            text-white 
            left-4
            
            ${errors[id] ? 'text-rose-500' : 'text-white'}
          `}
        >
          {label}
        </label>
      </div>
    );
  }
  
  export default Select;
  