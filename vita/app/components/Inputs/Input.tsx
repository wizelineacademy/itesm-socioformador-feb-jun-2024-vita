import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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

/**
 * Componente de entrada personalizado que admite campos de entrada de texto normales,
 * campos de contraseña y campos de fecha. También maneja la visibilidad de la contraseña
 * y aplica estilos personalizados según el estado del campo. No mover
 * 
 * @author Bernardo de la Sierra Rábago
 * @version 
 * @component
 * 
 * @param {object} props - Propiedades del componente.
 * @param {string} props.id - ID único para el campo de entrada.
 * @param {string} props.label - Etiqueta del campo de entrada.
 * @param {string} [props.type] - Tipo de campo de entrada (por defecto: 'text').
 * @param {boolean} [props.disabled] - Indica si el campo de entrada está deshabilitado (por defecto: false).
 * @param {boolean} [props.required] - Indica si el campo de entrada es obligatorio (por defecto: false).
 * @param {UseFormRegister<FieldValues>} props.register - Función de registro proporcionada por react-hook-form.
 * @param {FieldErrors} props.errors - Objeto que contiene los errores del campo de entrada.
 * @param {boolean} [props.big] - Indica si el campo de entrada es grande (por defecto: false).
 * 
 * @returns {JSX.Element} - Devuelve el componente de entrada personalizado.
 */

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

  // Inicializa showPassword dependiendo del tipo de campo
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

  return (
    <div className="w-full relative">
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
          ${errors[id] ? 'text-rose-500' : ''}
        `}
      >
        {label.includes('*') ? (
        <>
            {label.replace('*', '')} {/* Esto muestra el texto del label sin el asterisco (*) */}
            <span className="text-custom-red">*</span> {/* Esto muestra solo el asterisco (*) con el color personalizado definido por la clase `text-custom-red` */}
          </>
        ) : (
          label // Si no hay asterisco, muestra el texto del label normalmente
        )}
      </label>
      {/* Agregar un botón para alternar la visibilidad de la contraseña si hay contenido */}
      {isPasswordInput && passwordValue && (
        <button
          type="button"
          className="absolute top-5 right-4 text-white"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEye size={24} /> : <FaEyeSlash size={24} />}

        </button>
      )}
      {/* Estilo para cambiar el color del icono del calendario en un input de tipo date */}
      {isDateInput && (
        <style>{`
          /* Estilo para todos los navegadores */
          input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1); /* Safari y Chrome */
          }
          input[type="date"]::-webkit-inner-spin-button,
          input[type="date"]::-webkit-clear-button {
            filter: invert(1); /* Safari */
          }
          input[type="date"]::-webkit-calendar-picker-indicator:after {
            filter: invert(0); /* Safari */
          }
          input[type="date"]::-ms-clear {
            filter: invert(1); /* IE */
          }
        `}</style>
      )}
    </div>
  );
};

export default Input;
