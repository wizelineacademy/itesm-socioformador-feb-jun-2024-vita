import React from 'react';

interface AddModalProps {
    modalOpen: boolean;
    editMode: boolean;
    closeModal: () => void;
    handleAddItem: () => void;
    item: any; // Puedes ajustar el tipo de 'item' según tus necesidades
    handleItemChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    title: string;
    fields: { name: string, placeholder: string }[];
}

function AddModal({
    modalOpen,
    editMode,
    closeModal,
    handleAddItem,
    item,
    handleItemChange,
    title,
    fields
}: AddModalProps) {
    return (
        modalOpen && editMode && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg w-80">
                    <h2 className="text-2xl font-bold mb-4">{title}</h2>
                    {fields.map((field, index) => (
                        <div key={index} className="mb-4">
                            {/* Campo para ingresar el valor del campo */}
                            <input
                                type="text"
                                name={field.name}
                                value={item[field.name]}
                                onChange={handleItemChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                                placeholder={field.placeholder}
                                required
                            />
                        </div>
                    ))}
                    {/* Botones para agregar y cancelar */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleAddItem}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Agregar
                        </button>
                        <button
                            onClick={closeModal}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

export default AddModal;
