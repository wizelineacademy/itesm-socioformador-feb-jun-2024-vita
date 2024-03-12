'use client';

import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";


interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text", 
  disabled, 
  formatPrice,
  register,
  required,
  errors,
}) => {
  return (
    
    <div className="w-full relative">
     
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={type}
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
        
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'focus:border-rose-500' : ''}
        `}
      />
      <label 
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
          text-white 
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-white'}
        `}
      >
        {label}
      </label>
    </div>
   );
}
 
export default Input;
