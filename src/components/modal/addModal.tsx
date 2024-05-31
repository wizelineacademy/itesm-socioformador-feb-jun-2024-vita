import React from 'react'

interface AddModalProps {
  modalOpen: boolean
  editMode: boolean
  closeModal: () => void
  handleAddItem: () => void
  item: unknown // Puedes ajustar el tipo de 'item' según tus necesidades
  handleItemChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  title: string
  fields: { name: string; placeholder: string }[]
}

function AddModal({
  modalOpen,
  editMode,
  closeModal,
  handleAddItem,
  item,
  handleItemChange,
  title,
  fields,
}: AddModalProps) {
  return (
    modalOpen &&
    editMode && (
      <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
        <div className='w-80 rounded-lg bg-white p-8'>
          <h2 className='mb-4 text-2xl font-bold'>{title}</h2>
          {fields.map((field, index) => (
            <div key={index} className='mb-4'>
              {/* Campo para ingresar el valor del campo */}
              <input
                type='text'
                name={field.name}
                value={item[field.name]}
                onChange={handleItemChange}
                className='w-full rounded-md border border-gray-300 p-2'
                placeholder={field.placeholder}
                required
              />
            </div>
          ))}
          {/* Botones para agregar y cancelar */}
          <div className='flex justify-end'>
            <button
              onClick={closeModal}
              className='mr-2 rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400'
            >
              Cancelar
            </button>
            <button
              onClick={handleAddItem}
              className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default AddModal
