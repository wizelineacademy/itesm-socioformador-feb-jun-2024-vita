interface AddModalButtonProps {
  editMode: boolean
  onClick: () => void
}

const AddModalButton: React.FC<AddModalButtonProps> = ({
  editMode,
  onClick,
}) => {
  return (
    <>
      {editMode && (
        <div className='mr-5 flex justify-end'>
          <button
            onClick={(e) => {
              e.preventDefault()
              onClick()
            }}
            className='mt-2 cursor-pointer rounded-full bg-blue-500 px-4 py-1 text-3xl font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700'
          >
            +
          </button>
        </div>
      )}
    </>
  )
}

export default AddModalButton
