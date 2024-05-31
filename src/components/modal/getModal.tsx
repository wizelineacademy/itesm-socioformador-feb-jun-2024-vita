interface ModalContent {
  label: string
  value: string
}

interface GetModalProps {
  modalOpen: boolean
  closeModal: () => void
  modalTitle: string
  modalContent: ModalContent[]
  onCloseButtonClick: () => void
}

export const GetModal: React.FC<GetModalProps> = ({
  modalOpen,
  closeModal,
  modalTitle,
  modalContent,
  onCloseButtonClick,
}) => {
  return (
    modalOpen && (
      <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
        <div className='rounded-lg bg-white p-8'>
          <p className='mb-4 text-2xl font-bold'>{modalTitle}</p>
          <div className='flex flex-col'>
            {modalContent.map((content, index) => (
              <div key={index} className='flex flex-col'>
                <p className='px-6 py-2 text-lg font-bold text-black'>
                  {content.label}
                </p>
                <div className='w-70 rounded-full bg-white px-6 py-2 lg:w-[280px]'>
                  <p className='text-lg font-bold text-gray-400'>
                    {content.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-end'>
            <button
              className='mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
              onClick={onCloseButtonClick}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default GetModal
