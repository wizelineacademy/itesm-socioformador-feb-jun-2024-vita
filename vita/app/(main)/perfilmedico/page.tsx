'use client';
import React, { useState, CSSProperties, FC, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

// Profile section component
interface ProfileSectionProps {
    children?: ReactNode;
    label: string;
}

const ProfileSection: FC<ProfileSectionProps> = ({ children, label }) => {
    const sectionStyle: CSSProperties = {
        backgroundColor: '#FFFFFF',
        padding: '25px 20px',
        marginBottom: '60px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        position: 'relative',
    };

    const labelStyle: CSSProperties = {
        position: 'absolute',
        top: '-30px',
        left: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
    };

    return (
        <div style={sectionStyle}>
            <div style={labelStyle}>{label}</div>
            {children}
        </div>
    );
};

// Rectangle component with modal functionality
interface RectangleProps {
    text: string;
    requiredFields: string[]; // Required fields for validation
}

const Rectangle: FC<RectangleProps> = ({ text, requiredFields }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
    const [savedData, setSavedData] = useState<string | null>(null); // State to store saved data


    const rectangleStyle: CSSProperties = {
        width: '100%',
        backgroundColor: '#176376',
        borderRadius: '30px',
        marginBottom: '20px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
    };

    const textStyle: CSSProperties = {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: '18px',
        marginLeft: '10px',
    };

    const angleStyle: CSSProperties = {
        color: '#000000',
        position: 'absolute',
        right: '10px',
        transform: 'rotate(-90deg) scale(1.5)',
    };

    const handleOpenModal = () => {
        setModalOpen(true);
        setError(''); // Clear error when opening the modal
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setError(''); // Clear error on modal close
    };

    // Handle input change to keep track of values
    const handleInputChange = (field: string, value: string) => {
        setInputValues({ ...inputValues, [field]: value });
    };

    // Validate inputs to ensure all required fields are filled
    const validateInputs = (): boolean => {
        for (const field of requiredFields) {
            if (!inputValues[field] || inputValues[field].trim() === '') {
                return false;
            }
        }
        return true;
    };

    const handleSave = () => {
        if (!validateInputs()) {
            setError('Por favor, ¡rellena todos los campos!');
        } else {
            setModalOpen(false);
            setError('');
            // Save data
            const data = Object.values(inputValues).join(' - ');
            setSavedData(data);
        }
    };

    let modalContent: ReactNode = null;

    if (text === 'Contacto de Emergencias') {
        modalContent = (
            <>
                <div style={{ marginBottom: '10px' }}>
                    <label>Nombre del Contacto:</label>
                    <input
                        type="text"
                        onChange={(e) => handleInputChange('Nombre del Contacto', e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}> {/* Correctly formatted style attribute */}
                    <label>Teléfono del Contacto:</label>
                <input
                    type="tel" 
                    onChange={(e) => handleInputChange('Teléfono del Contacto', e.target.value)}
    />
</div>
            </>
        );
    } else if (text === 'Nombre Completo') {
        modalContent = (
            <>
                <div style={{ marginBottom: '10px' }}> {/* Main content */}
                    <label>Nombre Completo:</label>
                    <input
                        type="text"
                        onChange={(e) => handleInputChange('Nombre Completo', e.target.value)} 
                    />
                </div>
            </>
        );
    } else if (text == 'Alergias') {
        modalContent = (
            <>
                <div style={{ marginBottom: '10px' }}> {/* Main content */}
                    <label>Nombre de la alergia:</label>
                    <input
                        type="text"
                        onChange={(e) => handleInputChange('Nombre de la alergia', e.target.value)} 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}> {/* Correctly formatted style attribute */}
                    <label>Tipo de alergia:</label>
                <input
                    type="tel" 
                    onChange={(e) => handleInputChange('Tipo de alergia', e.target.value)}
    />
                </div>
                <div style={{ marginBottom: '10px' }}> {/* Correctly formatted style attribute */}
                    <label>Reacción alérgica:</label>
                <input
                    type="tel" 
                    onChange={(e) => handleInputChange('Reacción alérgica', e.target.value)}
    />
</div>
            </>
        );
    } else if (text === 'Discapacidades') {
        modalContent = (
            <>
                <div style={{ marginBottom: '10px' }}> {/* Main content */}
                    <label>Nombre de la discapacidad:</label>
                    <input
                        type="text"
                        onChange={(e) => handleInputChange('Discapacidades', e.target.value)} 
                    />
                </div>
            </>
        );
    } else if (text === 'Enfermedades Crónicas') {
        modalContent = (
            <>
                <div style={{ marginBottom: '10px' }}> {/* Main content */}
                    <label>Nombre de la enfermedad crónica:</label>
                    <input
                        type="text"
                        onChange={(e) => handleInputChange('Enfermedades Crónicas', e.target.value)} 
                    />
                </div>
            </>
        );
    } else if (text === 'Póliza') {
        modalContent = (
            <>
                <div style={{ marginBottom: '10px' }}> {/* Main content */}
                    <label>Número de la póliza:</label>
                    <input
                        type="text"
                        onChange={(e) => handleInputChange('Número de la póliza', e.target.value)} 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}> {/* Main content */}
                    <label>Nombre de la aseguradora:</label>
                    <input
                        type="text"
                        onChange={(e) => handleInputChange('Nombre de la aseguradora', e.target.value)} 
                    />
                </div>
            </>
        );
    } else if (text === 'Tipo de Sangre') {
        modalContent = (
            <>
                <div style={{ marginBottom: '10px' }}> {/* Main content */}
                    <label>Tipo de sangre:</label>
                    <input
                        type="text"
                        onChange={(e) => handleInputChange('Tipo de sangre', e.target.value)} 
                    />
                </div>
            </>
        );
    } else if (text === 'Medicamentos') {
        modalContent = (
            <>
                <div style={{ marginBottom: '10px' }}> {/* Main content */}
                    <label>Nombre del medicamento:</label>
                    <input
                        type="text"
                        onChange={(e) => handleInputChange('Nombre del medicamento', e.target.value)} 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}> {/* Main content */}
                    <label>Vía de administración:</label>
                    <input
                        type="text"
                        onChange={(e) => handleInputChange('Vía de administración', e.target.value)} 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}> {/* Main content */}
                    <label>Dosis:</label>
                    <input
                        type="text"
                        onChange={(e) => handleInputChange('Dosis', e.target.value)} 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}> {/* Main content */}
                    <label>Duración:</label>
                    <input
                        type="text"
                        onChange={(e) => handleInputChange('Duración', e.target.value)} 
                    />
                </div>
            </>
        );
    } else if (text === 'Dirección') {
        modalContent = (
            <>
                <div style={{ marginBottom: '10px' }}> {/* Main content */}
                    <label>Calle:</label>
                    <input
                        type="text"
                        onChange={(e) => handleInputChange('Calle', e.target.value)} 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}> {/* Main content */}
                    <label>Número:</label>
                    <input
                        type="text"
                        onChange={(e) => handleInputChange('Número', e.target.value)} 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}> {/* Main content */}
                    <label>Código Postal:</label>
                    <input
                        type="text"
                        onChange={(e) => handleInputChange('Código Postal', e.target.value)} 
                    />
                </div>
                <div style={{ marginBottom: '10px' }}> {/* Main content */}
                    <label>Ciudad/Localidad:</label>
                    <input
                        type="text"
                        onChange={(e) => handleInputChange('Ciudad/Localidad', e.target.value)} 
                    />
                </div>
            </>
        );
    }
    return (
        <>
            {/* Render saved data if available */}
            {savedData && (
                <div style={{ backgroundColor: '#ADD8E6', borderRadius: '10px', padding: '10px', marginTop: '20px' }}>
                    {text}: {savedData}
                </div>
            )}
            <div style={rectangleStyle} onClick={handleOpenModal}>
                <span style={textStyle}>{text}</span>
                <FontAwesomeIcon icon={faAngleRight} style={angleStyle} />
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel={`${text} Modal`}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '10px',
                        backgroundColor: '#BFEBFF',
                        border: '1px solid black',
                    },
                }}
            >
                <div style={{ padding: '20px' }}>
                    {modalContent}
                    {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
                        <button
                            style={{
                                width: '120px',
                                backgroundColor: 'red',
                                color: 'white',
                                fontSize: '18px',
                                padding: '10px',
                                borderRadius: '8px',
                                border: 'none',
                            }}
                            onClick={handleCloseModal}
                        >
                            Cancelar
                        </button>
                        <button
                            style={{
                                width: '120px',
                                backgroundColor: 'green',
                                color: 'white',
                                fontSize: '18px',
                                padding: '10px',
                                borderRadius: '8px',
                                border: 'none',
                            }}
                            onClick={handleSave}
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

const mainContainerStyle: CSSProperties = {
    backgroundColor: '#F4FDFF',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: '100vh',
    padding: '30px',
};

const columnStyle: CSSProperties = {
    width: 'calc(50% - 20px)',
    marginRight: '40px',
};

const titleStyle: CSSProperties = {
    fontSize: '50px',
    fontWeight: 'bold',
    marginBottom: '83px',
};

const subTitleStyle: CSSProperties = {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
};

const rightColumnOffset: CSSProperties = {
    marginTop: '132px',
};

const Perfil: FC = () => (
    <div style={mainContainerStyle}>
        <div style={columnStyle}>
            <h1 style={titleStyle}>Perfil</h1>
            <ProfileSection label="Nombre" />
            <ProfileSection label="Teléfono" />
            <h1 style={subTitleStyle}>Perfil Médico</h1>
            <Rectangle text="Nombre Completo" requiredFields={['Nombre Completo']} />
            <Rectangle text="Contacto de Emergencias" requiredFields={['Nombre del Contacto', 'Teléfono del Contacto']} />
            <Rectangle text="Alergias" requiredFields={['Nombre de la alergia', 'Tipo de alergia', 'Reacción alérgica']} />
            <Rectangle text="Discapacidades" requiredFields={['Discapacidades']} />
            <Rectangle text="Enfermedades Crónicas" requiredFields={['Enfermedades Crónicas']} />
            <Rectangle text="Póliza" requiredFields={['Número de la póliza', 'Nombre de la aseguradora']} />
            <Rectangle text="Tipo de Sangre" requiredFields={['Tipo de sangre']} />
            <Rectangle text="Medicamentos" requiredFields={['Nombre del medicamento','Vía de administración','Dosis','Duración']} />
            <Rectangle text="Dirección" requiredFields={['Calle','Número','Código Postal','Ciudad/Localidad']} />
            {/* Move light blue rectangles here */}
        </div>
        <div style={{ ...columnStyle, ...rightColumnOffset }}>
            <ProfileSection label="Correo" />
            <ProfileSection label="Contraseña" />
        </div>
        {/* Add light blue rectangles here */}
    </div>
);
export default Perfil;