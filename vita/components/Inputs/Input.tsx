import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import isPossiblePhoneNumber from 'react-phone-input-2';

import 'react-phone-input-2/lib/style.css';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  big?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  register,
  required,
  errors,
  big,
}) => {
  const isDateInput = type === "date";
  const isPasswordInput = type === "password";

  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPasswordValue(value);
  };

  const inputType = isPasswordInput ? (showPassword ? 'text' : 'password') : type;

  const handlePhoneNumberChange = (passwordValue: string) => {
    setPasswordValue(passwordValue); 
  };

  return (
    <div className="w-full relative">
      {type !== 'tel' ? (
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder=" "
          type={inputType}
          value={passwordValue}
          onChange={handleInputChange}
          className={`
            peer
            ${big ? 'lg:w-[500px] w-60' : 'w-60'}
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
            pl-4
            ${errors[id] ? 'focus:border-rose-500' : ''}
          `}
        />
      ) : (
        <PhoneInput
          inputProps={{
            id: id,
            name: id,
            disabled: disabled,
            placeholder: " ",
            required: required,
            className: `
              peer
              ${big ? 'lg:w-[500px] w-60' : 'w-60'}
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
          value={passwordValue}
          onChange={handlePhoneNumberChange}
        />
      )}
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
          ${type !== 'tel' ? '' : 'pl-8'} 
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
      {isPasswordInput && passwordValue && (
        <button
          type="button"
          className="absolute top-5 right-4 text-white"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEye size={24} /> : <FaEyeSlash size={24} />}
        </button>
      )}
      {isDateInput && (
        <style>{`
          input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
          }
          input[type="date"]::-webkit-inner-spin-button,
          input[type="date"]::-webkit-clear-button {
            filter: invert(1);
          }
          input[type="date"]::-webkit-calendar-picker-indicator:after {
            filter: invert(0);
          }
          input[type="date"]::-ms-clear {
            filter: invert(1);
          }
        `}</style>
      )}
    </div>
  );
};

export default Input;