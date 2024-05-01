import React from 'react';
import { FiTrash2, FiEdit, FiInfo } from 'react-icons/fi';

interface ItemData {
  id: number;
  name: string;
  // Otras propiedades según la estructura de tus datos
}

interface ItemProps {
  data: ItemData;
  editMode: boolean;
  openModal: (data: ItemData) => void;
  handleEditClick: (data: ItemData, id: number) => void;
  deleteItem: (id: number) => void;
}

const Item: React.FC<ItemProps> = ({ data, editMode, openModal, handleEditClick, deleteItem }) => (
  <div className="flex flex-row mb-2 justify-around items-center">
    <p className="font-bold text-black text-lg py-2 px-6">Nombre:</p>
    <div className="py-2 px-6 rounded-full lg:w-[280px] w-70 flex items-center bg-white">
      <p className="font-bold text-gray-400 text-lg">{data.name}</p>
    </div>
    {editMode ? (
      <>
        <FiTrash2
          className="ml-2 h-8 w-8 text-red-500 cursor-pointer hover:text-red-800 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={(e) => {
            e.preventDefault();
            deleteItem(data.id);
          }}
        />
        <FiEdit
          className="ml-2 h-8 w-8 text-blue-500 cursor-pointer hover:text-blue-800 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={(e) => {
            e.preventDefault();
            handleEditClick(data, data.id);
          }}
        />
      </>
    ) : (
      <FiInfo
        className="ml-2 h-8 w-8 text-gray-500 cursor-pointer hover:text-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
        onClick={() => openModal(data)}
      />
    )}
  </div>
);

export default Item;
