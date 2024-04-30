import Swal from 'sweetalert2';
import axios from 'axios';

interface Item {
    id: string;
    type: string;
    endpoint: string;
    successMessage: string;
}

export const deleteItemProfile = async (item: Item, getData: () => void) => {
    const { id, type, endpoint, successMessage } = item;
    
    const confirmationResult = await Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Quieres eliminar este ${type}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    });

    if (confirmationResult.isConfirmed) {
        try {
            const response = await axios.delete(endpoint);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Éxito',
                    text: successMessage,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                getData();
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error',
                text: `Ocurrió un error al eliminar el ${type}`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
};