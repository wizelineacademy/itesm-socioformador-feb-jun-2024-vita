import React from 'react';

interface Field {
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

interface Props {
  editingData: any;
  editMode: boolean;
  handleEdit: () => void;
  closeModal: () => void;
  fields: Field[];
  setEditingData: React.Dispatch<React.SetStateAction<any>>;
}

const EditModal: React.FC<Props> = ({
  editingData,
  editMode,
  handleEdit,
  closeModal,
  fields,
  setEditingData
}) => {
  return (
    editingData && editMode && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Editar</h2>
          {fields.map(field => (
            <div key={field.name} className="mb-4">
              <input
                type={field.type || 'text'}
                name={field.name}
                value={editingData[field.name]}
                onChange={(e) => setEditingData({ ...editingData, [field.name]: e.target.value })}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder={field.placeholder || `Ingrese ${field.name}`}
                required={field.required || false}
              />
            </div>
          ))}
          {/* Botones para guardar los cambios o cancelar */}
          <div className="flex justify-end">
            
            <button
              onClick={closeModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditModal;
