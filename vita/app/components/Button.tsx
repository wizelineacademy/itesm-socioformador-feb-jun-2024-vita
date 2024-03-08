import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // Cambiado para cuando haya evento
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  borderColor?: string;
}


/**
 * @description Este es el boton customizado para diferentes tipos todavia no hago la version mediana pero
 * se puede cambiar
 * @author Bernardo de la Sierra
 * @version 1.0.0 
 * @param {string} label - Texto que le desea poner al boton 
 * @param {boolean} [disabled] - Indica si el botón está desactivado o no. Por defecto es `false`.
 * @param {boolean} [outline] - Indica si el botón tendrá un estilo de borde. Por defecto es `false`.
 * @param {boolean} [small] - Indica si el botón tendrá un tamaño pequeño. Por defecto es `false`.
 * @param {IconType} [icon] - Un icono opcional que se mostrará junto al texto del botón.
 * @param {string} borderColor - El color del borde del botón.(Se pone border-nombredelcolor)
 * @param {Event} onClick Sirve para enviar el evento
 * @returns {JSX.Element} Retorna un elemento JSX que representa el botón.
 */
const Button: React.FC<ButtonProps> = ({ 
    label, 
    onClick, 
    disabled, 
    outline,
    small,
    icon: Icon,
    borderColor
  }) => {
    return ( 
      <button
        disabled={disabled}
        // onClick={onClick} // Manejar el evento aquí
        className={`
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          hover:opacity-80
          transition
          text-white 
          rounded-full
          font-bold
          py-3
          ${outline ? borderColor : ''}
       
          ${small ? 'text-2xl' : 'text-3xl'}
          ${small ? 'w-60' : 'w-70'} // Cambiarlo mas adelante no se el tamano del boton mediano
          ${small ? 'border-[3px]' : 'border-[4px]'} // Cambiarlo mas adelante no se el tamano del borde
        `}
        style={{ 
          background: 'none',
        }}
      >
        {Icon && (
          <Icon
            size={24}
            className="
              absolute
              lg:left-4
              top-3
            "
          />
        )}
        {label}
      
      </button>
     );
  }
   
  export default Button;
