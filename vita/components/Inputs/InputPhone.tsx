import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { useState } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface InputPhoneProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  big?: boolean;
}

const InputPhone: React.FC<InputPhoneProps> = ({
  id,
  label,
  disabled,
  register,
  required,
  errors,
  big,
}) => {
  const [phoneValue, setPhoneValue] = useState('');

  const handlePhoneChange = (phone: string) => {
    setPhoneValue(phone);
    alert(phone)
    // Actualizamos el valor en el formulario a través de register
    register(id, { value: phone, required });
    console.log("Papas",register(id, { value: phone, required }))
  };
  
  return (
    <div className="w-full relative">
      <PhoneInput
        inputProps={{
          id: id,
          name: "phoneNumber",
          disabled: disabled,
          placeholder: " ",
          required: required,
          className: `
            peer
            ${big ? 'lg:w-[500px] ' : 'w-60'}
            px-4
            pt-6
            pb-2
            font-light 
            bg-custom-blue
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-full
            text-white 
            pl-12
            ${errors[id] ? 'focus:border-rose-500' : ''}
          `,
        }}
        country={'mx'}
        value={phoneValue}
        onChange={(phone) => handlePhoneChange(phone)}
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
          left-4
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          pl-8
          ${errors[id] ? 'text-rose-500' : ''}
        `}
      >
        {label.includes('*') ? (
          <>
            {label.replace('*', '')}
            <span className="text-custom-red">*</span>
          </>
        ) : (
          label
        )}
      </label>
    </div>
  );
};

export default InputPhone;
