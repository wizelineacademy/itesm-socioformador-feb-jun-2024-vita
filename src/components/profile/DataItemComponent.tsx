import { DataItem } from '@/src/data/datatypes/profile'
import { FiTrash2, FiEdit, FiInfo } from 'react-icons/fi'

interface DataItemProps<T extends DataItem> {
  item: T
  itemType: string
  itemLabel: string
  id: number
  editMode: boolean
  deleteItem: (id: number, type: string, url: string) => void
  handleEditClick: (item: T, id: number) => void
  openModal: (item: T) => void
}

const DataItemComponent = <T extends DataItem>({
  item,
  itemType,
  itemLabel,
  id,
  editMode,
  deleteItem,
  handleEditClick,
  openModal,
}: DataItemProps<T>) => (
  <div className='mb-2 flex flex-row items-center justify-around'>
    <p className='px-6 py-2 text-lg font-bold text-black'>
      Nombre de la {itemLabel}:
    </p>
    <div className='w-70 flex items-center rounded-full bg-white px-6 py-2 lg:w-[280px]'>
      <p className='text-lg font-bold text-gray-400'>{item.name}</p>
    </div>
    {editMode ? (
      <>
        <FiTrash2
          className='ml-2 h-8 w-8 transform cursor-pointer text-red-500 transition duration-300 ease-in-out hover:scale-105 hover:text-red-800'
          onClick={(e) => {
            e.preventDefault()
            deleteItem(id, itemLabel, `/api/profile/${itemType}`)
          }}
        />
        <FiEdit
          className='ml-2 h-8 w-8 transform cursor-pointer text-blue-500 transition duration-300 ease-in-out hover:scale-105 hover:text-blue-800'
          onClick={(e) => {
            e.preventDefault()
            handleEditClick(item, id)
          }}
        />
      </>
    ) : (
      <FiInfo
        className='ml-2 h-8 w-8 transform cursor-pointer text-gray-500 transition duration-300 ease-in-out hover:scale-105 hover:text-gray-800'
        onClick={() => openModal(item)}
      />
    )}
  </div>
)

export default DataItemComponent
