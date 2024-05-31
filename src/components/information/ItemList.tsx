import React from 'react'
import { FiTrash2, FiEdit, FiInfo } from 'react-icons/fi'

interface ItemData {
  id: number
  name: string
  // Otras propiedades según la estructura de tus datos
}

interface ItemProps {
  data: ItemData
  editMode: boolean
  openModal: (data: ItemData) => void
  handleEditClick: (data: ItemData, id: number) => void
  deleteItem: (id: number) => void
}

const Item: React.FC<ItemProps> = ({
  data,
  editMode,
  openModal,
  handleEditClick,
  deleteItem,
}) => (
  <div className='mb-2 flex flex-row items-center justify-around'>
    <p className='px-6 py-2 text-lg font-bold text-black'>Nombre:</p>
    <div className='w-70 flex items-center rounded-full bg-white px-6 py-2 lg:w-[280px]'>
      <p className='text-lg font-bold text-gray-400'>{data.name}</p>
    </div>
    {editMode ? (
      <>
        <FiTrash2
          className='ml-2 h-8 w-8 transform cursor-pointer text-red-500 transition duration-300 ease-in-out hover:scale-105 hover:text-red-800'
          onClick={(e) => {
            e.preventDefault()
            deleteItem(data.id)
          }}
        />
        <FiEdit
          className='ml-2 h-8 w-8 transform cursor-pointer text-blue-500 transition duration-300 ease-in-out hover:scale-105 hover:text-blue-800'
          onClick={(e) => {
            e.preventDefault()
            handleEditClick(data, data.id)
          }}
        />
      </>
    ) : (
      <FiInfo
        className='ml-2 h-8 w-8 transform cursor-pointer text-gray-500 transition duration-300 ease-in-out hover:scale-105 hover:text-gray-800'
        onClick={() => openModal(data)}
      />
    )}
  </div>
)

export default Item
