import Swal from 'sweetalert2';
import axios from 'axios';

export const confirmAndDelete = async (
  id: string,
  itemType: string,
  deleteCallback: (id: string) => Promise<any>
) => {
  // Mostrar mensaje de confirmación
  const confirmationResult = await Swal.fire({
    title: '¿Estás seguro?',
    text: `¿Quieres eliminar este ${itemType}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  });

  // Si el usuario confirma la eliminación
  if (confirmationResult.isConfirmed) {
    try {
      const response = await deleteCallback(id);
      if (response.status === 200) {
        Swal.fire({
          title: 'Éxito',
          text: `El ${itemType} ha sido eliminado exitosamente`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      alert(error);
      Swal.fire({
        title: 'Error',
        text: `Ocurrió un error al eliminar el ${itemType}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
};
