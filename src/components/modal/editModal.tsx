import React from 'react'

interface Field {
  name: string
  type?: string
  placeholder?: string
  required?: boolean
}

interface Props {
  editingData: any
  editMode: boolean
  handleEdit: () => void
  closeModal: () => void
  fields: Field[]
  setEditingData: React.Dispatch<React.SetStateAction<any>>
}

const EditModal: React.FC<Props> = ({
  editingData,
  editMode,
  handleEdit,
  closeModal,
  fields,
  setEditingData,
}) => {
  return (
    editingData &&
    editMode && (
      <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
        <div className='rounded-lg bg-white p-8'>
          <h2 className='mb-4 text-2xl font-bold'>Editar</h2>
          {fields.map((field) => (
            <div key={field.name} className='mb-4'>
              <input
                type={field.type || 'text'}
                name={field.name}
                value={editingData[field.name]}
                onChange={(e) =>
                  setEditingData({
                    ...editingData,
                    [field.name]: e.target.value,
                  })
                }
                className='w-full rounded-md border border-gray-300 p-2'
                placeholder={field.placeholder || `Ingrese ${field.name}`}
                required={field.required || false}
              />
            </div>
          ))}
          {/* Botones para guardar los cambios o cancelar */}
          <div className='flex justify-end'>
            <button
              onClick={closeModal}
              className='mr-2 rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400'
            >
              Cancelar
            </button>
            <button
              onClick={handleEdit}
              className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default EditModal
