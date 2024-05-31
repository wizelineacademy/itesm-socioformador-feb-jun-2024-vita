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
      Swal.fire({
        title: 'Error',
        text: `Ocurrió un error al eliminar el ${itemType}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
};

export const handleEditItem = async (
  item: any, // Puedes especificar el tipo de tu objeto aquí
  itemType: string,
  editCallback: (item: any) => Promise<any>,
  closeCallback: () => void,
  getDataCallback: () => void,
  setEditingItem: (item: any | null) => void
) => {
  try {
    if (item) {
      const response = await editCallback(item);
      if (response.status === 200) {
        Swal.fire({
          title: 'Éxito',
          text: `Se han guardado los cambios en ${itemType} con éxito`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        closeCallback();
        getDataCallback();
        setEditingItem(null);
      }
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: `Ocurrió un error al guardar los cambios en ${itemType}`,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
};

export const handleInput = <T extends {}>(
  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setter: React.Dispatch<React.SetStateAction<T>>
) => {
  const { name, value } = event.target;
  setter((prevState: T) => ({
    ...prevState,
    [name]: value
  }));
};

export const handleAddItem = async (
  newItem: any, // Puedes especificar el tipo de tu objeto aquí
  itemType: string,
  editedDataProfile: any, // Asumo que es un objeto con la información del perfil editado
  addItemCallback: (data: any) => Promise<void>, // Función para agregar el nuevo elemento
  resetCallback: () => void, // Función para reiniciar los valores del nuevo elemento
  closeCallback: () => void, // Función para cerrar el modal después de agregar el elemento
  getDataCallback: () => void // Función para obtener los datos actualizados
) => {
  try {
    if (editedDataProfile && newItem) {
      const { idMedicalProfile } = editedDataProfile;
      const itemData = {
        ...newItem,
        idMedicalProfile: idMedicalProfile
      };

      await addItemCallback(itemData);
      
      Swal.fire({
        title: 'Éxito',
        text: `Se ha agregado ${itemType} con éxito`,
        icon: 'success',
        confirmButtonText: 'OK'
      });

      resetCallback();
      closeCallback();
      getDataCallback();
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: `Ocurrió un error al agregar ${itemType}`,
      icon: 'error',
      confirmButtonText: 'OK'
    });
    
  }
};
