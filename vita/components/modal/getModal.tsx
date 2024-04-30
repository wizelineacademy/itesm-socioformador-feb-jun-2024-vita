interface ModalContent {
    label: string;
    value: string;
}

interface GetModalProps {
    modalOpen: boolean;
    closeModal: () => void;
    modalTitle: string;
    modalContent: ModalContent[];
    onCloseButtonClick: () => void;
}

export const GetModal: React.FC<GetModalProps> = ({ modalOpen, closeModal, modalTitle, modalContent, onCloseButtonClick }) => {
    return (
        modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg">
                    <p className="text-2xl font-bold mb-4">{modalTitle}</p>
                    <div className="flex flex-col">
                        {modalContent.map((content, index) => (
                            <div key={index} className='flex flex-col'>
                                <p className="font-bold text-black text-lg py-2 px-6">{content.label}</p>
                                <div className='py-2 px-6 rounded-full lg:w-[280px] w-70 bg-white'>
                                    <p className="font-bold text-gray-400 text-lg">{content.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onCloseButtonClick}>Cerrar</button>
                </div>
            </div>
        )
    );
};

export default GetModal;
