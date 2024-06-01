'use client'
import Swal from 'sweetalert2'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { UserData } from '@/src/data/datatypes/user'
import ToggleComponent from '@/src/components/information/toggle'
import {
  AllergiesData,
  ChronicalData,
  DisabilityData,
  EditAllergiesData,
  EditChronicalData,
  EditDisabilityData,
  EditMedicinesData,
  EditProfileData,
  GetAllergiesData,
  GetChronicalData,
  GetDisabilityData,
  GetMedicinesData,
  MedicinesData,
  ProfileData,
} from '@/src/data/datatypes/profile'
import { FiInfo, FiEdit, FiTrash2 } from 'react-icons/fi'
import GetModal from '@/src/components/modal/getModal'
import AddModal from '@/src/components/modal/addModal'
import {
  confirmAndDelete,
  handleAddItem,
  handleEditItem,
  handleInput,
} from '@/src/lib/profile/functions'
import EditModal from '@/src/components/modal/editModal'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

const Profile = () => {
  const router = useRouter()
  const [editMode, setEditMode] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [userDataProfile, setUserDataProfile] = useState<ProfileData | null>(
    null,
  )
  const [editedDataProfile, setEditedDataProfile] =
    useState<EditProfileData | null>(null)
  //Allergies
  const [modalOpen, setModalOpen] = useState(false)
  const [allergiesData, setAllergiesData] = useState<GetAllergiesData | null>(
    null,
  )
  const [selectedAllergy, setSelectedAllergy] = useState<AllergiesData | null>(
    null,
  )
  const [editingAllergy, setEditingAllergy] =
    useState<EditAllergiesData | null>(null)

  const handleEditClick = (allergy: AllergiesData, allergyId: number) => {
    const editedAllergyData: EditAllergiesData = {
      idAllergies: allergyId,
      name: allergy.name,
      reaction: allergy.reaction,
    }
    setEditingAllergy(editedAllergyData)
    openAllergyModal()
  }

  const DeleteAllergies = async (idAllergy: number) => {
    await confirmAndDelete(idAllergy, 'alergia', async (id) => {
      return await axios.delete(`/api/profile/allergies/${id}`)
    })
    getData()
  }

  // Función para abrir el modal
  const openModal = (allergy: AllergiesData) => {
    setSelectedAllergy(allergy)
    setModalOpen(true)
  }

  // Función para cerrar el modal
  const closeModal = () => {
    setModalOpen(false)
  }

  // Estado local para almacenar el nombre de la nueva alergia
  const [newAllergy, setNewAllergy] = useState<AllergiesData>({
    name: '',
    reaction: '',
  })
  // Estado local para controlar la visibilidad del modal de alergia
  const [allergyModalOpen, setAllergyModalOpen] = useState(false)

  // Función para abrir el modal de alergia
  const openAllergyModal = () => {
    setAllergyModalOpen(true)
  }

  // Función para cerrar el modal de alergia
  const closeAllergyModal = () => {
    resetAllergy()
    setAllergyModalOpen(false)
    setEditingAllergy(null)
  }

  const handleEditAllergy = async () => {
    await handleEditItem(
      editingAllergy,
      'alergia',
      async (editedItem) => {
        return await axios.put(
          `/api/profile/allergies/${editedItem.idAllergies}`,
          {
            name: editedItem.name,
            reaction: editedItem.reaction,
          },
        )
      },
      closeAllergyModal,
      getData,
      setEditingAllergy,
    )
  }

  // Función para manejar el cambio en el campo de nueva alergia
  const handleNewAllergyChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    handleInput(event, setNewAllergy)
  }

  const resetAllergy = () => {
    setNewAllergy({ name: '', reaction: '' })
  }

  // Función para agregar una nueva alergia
  const handleAddAllergy = async () => {
    await handleAddItem(
      newAllergy,
      'una nueva alergia',
      editedDataProfile,
      async (allergyData) => {
        return await axios.post('/api/profile/allergies', allergyData)
      },
      resetAllergy,
      closeAllergyModal,
      getData,
    )
  }

  const handleCancelEdit = () => {
    setEditMode(false)
    setEditedDataProfile({
      idUser: userData?.idUser || 0,
      name: userData?.name || '',
      email: userData?.email || '',
      phoneNumber: userData?.phoneNumber || null,
      idMedicalProfile: userDataProfile?.idMedicalProfile || 0,
      emergencyName: userDataProfile?.emergencyName || null,
      emergencyPhone: userDataProfile?.emergencyPhone || null,
      policyUser: userDataProfile?.policyUser || null,
      insuranceCompany: userDataProfile?.insuranceCompany || null,
      bloodType: userDataProfile?.bloodType || null,
    })
  }

  // Función para manejar el cambio en los inputs
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    if (editedDataProfile) {
      setEditedDataProfile({ ...editedDataProfile, [name]: value })
    }
  }

  const getData = async () => {
    try {
      const response = await axios.get('/api/profile')
      const fetchedData = response.data
      setUserData(fetchedData)
      const response2 = await axios.get('/api/profile/userData')
      const fetchedData2 = response2.data
      setUserDataProfile(fetchedData2)

      setEditedDataProfile({
        idUser: fetchedData.idUser,
        name: fetchedData.name,
        email: fetchedData.email,
        phoneNumber: fetchedData.phoneNumber,
        idMedicalProfile: fetchedData2.idMedicalProfile,
        emergencyName: fetchedData2.emergencyName,
        emergencyPhone: fetchedData2.emergencyPhone,
        policyUser: fetchedData2.policyUser,
        insuranceCompany: fetchedData2.insuranceCompany,
        bloodType: fetchedData2.bloodType,
      })
      //Allergies
      const allergies = await axios.get(
        `/api/profile/allergies/${fetchedData2.idMedicalProfile}`,
      )
      const dataAllergies = allergies.data
      setAllergiesData(dataAllergies)
      // Disability
      const disability = await axios.get(
        `/api/profile/disabilities/${fetchedData2.idMedicalProfile}`,
      )
      const dataDisability = disability.data
      setDisabilityData(dataDisability)
      // Chronical Desease
      const chronical = await axios.get(
        `/api/profile/chronicalDesease/${fetchedData2.idMedicalProfile}`,
      )
      const dataChronical = chronical.data
      setChronicalData(dataChronical)
      //Medicines
      const medicines = await axios.get(
        `/api/profile/medicines/${fetchedData2.idMedicalProfile}`,
      )
      const dataMedicines = medicines.data
      setMedicinesData(dataMedicines)
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al recuperar los datos',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  useEffect(() => {
    getData()
  }, [])

  // Función para guardar los cambios editados
  const handleSaveChanges = async () => {
    try {
      if (editedDataProfile) {
        if (editedDataProfile?.email !== userData?.email) {
          const confirmResult = await Swal.fire({
            title: 'Advertencia',
            text: 'Si modificas tu correo electrónico, se te redirigirá a la página de inicio de sesión. ¿Estás seguro de que quieres continuar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, modificar correo',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
          })

          if (confirmResult.isConfirmed) {
            await axios.put('/api/profile', editedDataProfile)
            router.push('/login')
            router.refresh()
            Swal.fire({
              title: 'Éxito',
              text: 'Se han guardado las datos con éxito',
              icon: 'success',
              confirmButtonText: 'OK',
            })

            return
          } else {
            setEditedDataProfile((prevData) => {
              if (!prevData) {
                return null
              }
              return {
                ...prevData,
                email: userData?.email || '',
              }
            })
            return
          }
        }

        await axios.put('/api/profile', editedDataProfile)

        Swal.fire({
          title: 'Éxito',
          text: 'Se han guardado las datos con éxito',
          icon: 'success',
          confirmButtonText: 'OK',
        })
        getData()
        setEditMode(false)
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al actualizar los datos',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  //Disabilities
  const [modalOpen2, setModalOpen2] = useState(false)
  const [disabilityData, setDisabilityData] =
    useState<GetDisabilityData | null>(null)
  const [selectedDisability, setSelectedDisability] =
    useState<DisabilityData | null>(null)
  const [editingDisability, setEditingDisability] =
    useState<EditDisabilityData | null>(null)

  const handleEditClickDisability = (
    disability: DisabilityData,
    disabilityId: number,
  ) => {
    const editedDisabilityData: EditDisabilityData = {
      idDisability: disabilityId,
      name: disability.name,
    }
    setEditingDisability(editedDisabilityData)
    openDisabilityModal()
  }

  const DeleteDisability = async (idDisability: number) => {
    await confirmAndDelete(idDisability, 'discapacidad', async (id) => {
      return await axios.delete(`/api/profile/disabilities/${id}`)
    })
    getData()
  }

  const openModalDisability = (disability: DisabilityData) => {
    setSelectedDisability(disability)
    setModalOpen2(true)
  }

  const closeModalDisability = () => {
    setModalOpen2(false)
  }

  const [newDisability, setNewDisability] = useState<DisabilityData>({
    name: '',
  })
  const [disabilityModalOpen, setDisabilityModalOpen] = useState(false)

  const openDisabilityModal = () => {
    setDisabilityModalOpen(true)
  }

  // Función para cerrar el modal de alergia
  const closeDisabilityModal = () => {
    resetDisability()
    setDisabilityModalOpen(false)
    setEditingDisability(null)
  }

  const handleEditDisability = async () => {
    await handleEditItem(
      editingDisability,
      'discapacidad',
      async (editedItem) => {
        return await axios.put(
          `/api/profile/disabilities/${editedItem.idDisability}`,
          {
            name: editedItem.name,
          },
        )
      },
      closeDisabilityModal,
      getData,
      setEditingDisability,
    )
  }

  // Función para manejar el cambio en el campo de nueva alergia
  const handleNewDisabilityChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    handleInput(event, setNewDisability)
  }

  const resetDisability = () => {
    setNewDisability({ name: '' })
  }

  // Función para agregar una nueva alergia
  const handleAddDisability = async () => {
    await handleAddItem(
      newDisability,
      'una nueva discapacidad',
      editedDataProfile,
      async (disabilityData) => {
        return await axios.post('/api/profile/disabilities', disabilityData)
      },
      resetDisability,
      closeDisabilityModal,
      getData,
    )
  }

  //chronical
  const [modalOpen3, setModalOpen3] = useState(false)
  const [chronicalData, setChronicalData] = useState<GetChronicalData | null>(
    null,
  )
  const [selectedChronical, setSelectedChronical] =
    useState<ChronicalData | null>(null)
  const [editingChronical, setEditingChronical] =
    useState<EditChronicalData | null>(null)

  const handleEditClickChronical = (
    chronical: ChronicalData,
    chronicalId: number,
  ) => {
    const editedChronicalData: EditChronicalData = {
      idChronicalDesease: chronicalId,
      name: chronical.name,
    }
    setEditingChronical(editedChronicalData)
    openChronicalModal()
  }

  const DeleteChronical = async (idChronicalDesease: number) => {
    await confirmAndDelete(
      idChronicalDesease,
      'enfermedad crónica',
      async (id) => {
        return await axios.delete(`/api/profile/chronicalDesease/${id}`)
      },
    )
    getData()
  }

  const openModalChronical = (chronical: ChronicalData) => {
    setSelectedChronical(chronical)
    setModalOpen3(true)
  }

  const closeModalChronical = () => {
    setModalOpen3(false)
  }

  const [newChronical, setNewChronical] = useState<ChronicalData>({ name: '' })
  const [chronicalModalOpen, setChronicalModalOpen] = useState(false)

  const openChronicalModal = () => {
    setChronicalModalOpen(true)
  }

  // Función para cerrar el modal de alergia
  const closeChronicalModal = () => {
    resetChronical()
    setChronicalModalOpen(false)
    setEditingChronical(null)
  }

  const handleEditChronical = async () => {
    await handleEditItem(
      editingChronical,
      'enfermedad crónica',
      async (editedItem) => {
        return await axios.put(
          `/api/profile/chronicalDesease/${editedItem.idChronicalDesease}`,
          {
            name: editedItem.name,
          },
        )
      },
      closeChronicalModal,
      getData,
      setEditingChronical,
    )
  }

  // Función para manejar el cambio en el campo de nueva alergia
  const handleNewChronicalChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    handleInput(event, setNewChronical)
  }

  const resetChronical = () => {
    setNewChronical({ name: '' })
  }

  // Función para agregar una nueva alergia
  const handleAddChronical = async () => {
    await handleAddItem(
      newChronical,
      'una nueva enfermedad crónica',
      editedDataProfile,
      async (chronicalData) => {
        return await axios.post('/api/profile/chronicalDesease', chronicalData)
      },
      resetChronical,
      closeChronicalModal,
      getData,
    )
  }

  //medicines
  const [modalOpen4, setModalOpen4] = useState(false)
  const [medicinesData, setMedicinesData] = useState<GetMedicinesData | null>(
    null,
  )
  const [selectedMedicines, setSelectedMedicines] =
    useState<MedicinesData | null>(null)
  const [editingMedicines, setEditingMedicines] =
    useState<EditMedicinesData | null>(null)

  const handleEditClickMedicines = (
    medicines: MedicinesData,
    medicinesId: number,
  ) => {
    const editedMedicinesData: EditMedicinesData = {
      idMedicines: medicinesId,
      name: medicines.name,
      routeAdmin: medicines.routeAdmin,
      dose: medicines.dose,
      duration: medicines.duration,
    }
    setEditingMedicines(editedMedicinesData)
    openMedicinesModal()
  }

  const DeleteMedicines = async (idMedicines: number) => {
    await confirmAndDelete(idMedicines, 'Medicina', async (id) => {
      return await axios.delete(`/api/profile/medicines/${id}`)
    })
    getData()
  }

  const openModalMedicines = (medicines: MedicinesData) => {
    setSelectedMedicines(medicines)
    setModalOpen4(true)
  }

  const closeModalMedicines = () => {
    setModalOpen4(false)
  }

  const [newMedicines, setNewMedicines] = useState<MedicinesData>({
    name: '',
    routeAdmin: '',
    dose: '',
    duration: '',
  })
  const [medicinesModalOpen, setMedicinesModalOpen] = useState(false)

  const openMedicinesModal = () => {
    setMedicinesModalOpen(true)
  }

  // Función para cerrar el modal de alergia
  const closeMedicinesModal = () => {
    resetMedicines()
    setMedicinesModalOpen(false)
    setEditingMedicines(null)
  }

  const handleEditMedicines = async () => {
    await handleEditItem(
      editingMedicines,
      'medicina',
      async (editedItem) => {
        return await axios.put(
          `/api/profile/medicines/${editedItem.idMedicines}`,
          {
            name: editedItem.name,
            routeAdmin: editedItem.routeAdmin,
            dose: editedItem.dose,
            duration: editedItem.duration,
          },
        )
      },
      closeMedicinesModal,
      getData,
      setEditingMedicines,
    )
  }

  // Función para manejar el cambio en el campo de nueva alergia
  const handleNewMedicinesChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    handleInput(event, setNewMedicines)
  }

  const resetMedicines = () => {
    setNewMedicines({ name: '', routeAdmin: '', dose: '', duration: '' })
  }

  // Función para agregar una nueva alergia
  const handleAddMedicines = async () => {
    await handleAddItem(
      newMedicines,
      'una nueva medicina',
      editedDataProfile,
      async (medicinesData) => {
        return await axios.post('/api/profile/medicines', medicinesData)
      },
      resetMedicines,
      closeMedicinesModal,
      getData,
    )
  }

  const deleteAccount = async (password: string) => {
    try {
      await axios.post('/api/delete_account', {
        password,
      })
      Swal.fire({
        title: 'Cuenta eliminada',
        text: 'Se ha eliminado la cuenta',
        icon: 'success',
      }).then(() => {
        signOut({ callbackUrl: '/' })
      })
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error',
        icon: 'error',
      })
    }
  }

  const showPasswordDeleteModal = () => {
    Swal.fire({
      text: 'Ingresa tu contraseña para desactivar tu cuenta',
      input: 'password',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: 'crimson',
      customClass: {
        confirmButton: 'order-2',
        cancelButton: 'order-1 right-gap',
      },
      preConfirm: async (password) => {
        try {
          await deleteAccount(password)
        } catch (error) {
          Swal.showValidationMessage(`Ocurrió un error`)
        }
      },
    })
  }

  const showDeleteAccountModal = () => {
    Swal.fire({
      title: 'Desactivar cuenta',
      text: '¿Estás seguro de que quieres desactivar tu cuenta VITA?',
      icon: 'warning',
      iconColor: 'crimson',
      footer:
        'Tu información no podrá ser recuperada tras desactivar la cuenta',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: 'crimson',
      customClass: {
        confirmButton: 'order-2',
        cancelButton: 'order-1 right-gap',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        showPasswordDeleteModal()
      }
    })
  }

  return (
    <div className='mb-4'>
      <div className='mt-4 flex justify-start text-5xl font-bold text-white sm:justify-center sm:px-5 sm:py-4 md:justify-start lg:justify-start'>
        <h1 className='mr-2 w-[800px] pl-2 text-title-profile sm:pl-0'>
          Perfil
        </h1>
      </div>
      <div className='flex flex-col sm:ml-2 lg:w-3/4'>
        <div className='flex flex-col justify-between lg:flex-row'>
          <div className='ml-2 flex flex-col'>
            <p className='mb-2 mt-2 font-bold'>Nombre </p>
            {editMode ? (
              <input
                type='text'
                name='name'
                value={editedDataProfile?.name || ''}
                onChange={handleInputChange}
                className='w-[320px] rounded-full bg-input-home px-6 py-2 text-2xl'
                required
              />
            ) : (
              <div className='w-[320px] rounded-full bg-input-home px-6 py-2 text-2xl'>
                {userData && userData.name ? userData.name : ' Sin datos'}
              </div>
            )}
          </div>
          <div className='ml-2 flex flex-col'>
            <p className='mb-2 mt-2 font-bold'>Correo </p>
            {editMode ? (
              <input
                type='email'
                name='email'
                value={editedDataProfile?.email || ''}
                onChange={handleInputChange}
                className='w-[320px] rounded-full bg-input-home px-6 py-2 text-2xl'
                required
              />
            ) : (
              <div className='w-[320px] rounded-full bg-input-home px-6 py-2 text-2xl'>
                {userData && userData.email ? userData.email : ' Sin datos'}
              </div>
            )}
          </div>
        </div>

        <div className='mt-2 flex flex-col justify-between lg:flex-row'>
          <div className='ml-2 flex flex-col'>
            <p className='mb-2 mt-2 font-bold'> Teléfono </p>
            {editMode ? (
              <input
                type='text'
                name='phoneNumber'
                value={editedDataProfile?.phoneNumber || ''}
                onChange={handleInputChange}
                className='w-[320px] rounded-full bg-input-home px-6 py-2 text-2xl'
                required
                min='10'
              />
            ) : (
              <div className='w-[320px] rounded-full bg-input-home px-6 py-2 text-2xl'>
                {userData && userData.phoneNumber
                  ? userData.phoneNumber
                  : ' Sin datos'}
              </div>
            )}
          </div>
          <div className='ml-2 flex flex-col'>
            <p className='mb-2 mt-2 font-bold'>Tipo de Sangre </p>
            {editMode ? (
              <input
                type='text'
                name='bloodType'
                value={editedDataProfile?.bloodType || ''}
                onChange={handleInputChange}
                className='w-[320px] rounded-full bg-input-home px-6 py-2 text-2xl'
              />
            ) : (
              <div className='w-[320px] rounded-full bg-input-home px-6 py-2 text-2xl'>
                {userDataProfile && userDataProfile.bloodType
                  ? userDataProfile.bloodType
                  : ' Sin datos'}
              </div>
            )}
          </div>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSaveChanges()
        }}
      >
        <div className='mt-4 pl-2'>
          <ToggleComponent title='Contacto ' editModeToggle={false}>
            <div className='flex flex-col justify-around lg:flex-row'>
              <div className='flex flex-col'>
                <p className='px-6 py-2 text-lg font-bold text-black'>
                  Nombre del contacto:
                </p>
                {editMode ? (
                  <input
                    type='text'
                    name='emergencyName'
                    value={editedDataProfile?.emergencyName || ''}
                    onChange={handleInputChange}
                    className='w-70 rounded-full bg-white px-6 py-2 text-lg font-bold text-gray-400 lg:w-[280px]'
                  />
                ) : (
                  <div className='w-70 rounded-full bg-white px-6 py-2 lg:w-[280px]'>
                    <p className='text-lg font-bold text-gray-400'>
                      {userDataProfile && userDataProfile.emergencyName
                        ? userDataProfile.emergencyName
                        : ' Sin datos'}
                    </p>
                  </div>
                )}
              </div>
              <div className='flex flex-col'>
                <p className='px-6 py-2 text-lg font-bold text-black'>
                  Teléfono del contacto:
                </p>
                {editMode ? (
                  <input
                    type='text'
                    name='emergencyPhone'
                    value={editedDataProfile?.emergencyPhone || ''}
                    onChange={handleInputChange}
                    className='w-70 rounded-full bg-white px-6 py-2 text-lg font-bold text-gray-400 lg:w-[280px]'
                    min='10'
                  />
                ) : (
                  <div className='w-70 rounded-full bg-white px-6 py-2 lg:w-[280px]'>
                    <p className='text-lg font-bold text-gray-400'>
                      {userDataProfile && userDataProfile.emergencyPhone
                        ? userDataProfile.emergencyPhone
                        : ' Sin datos'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </ToggleComponent>

          <ToggleComponent title='Póliza' editModeToggle={false}>
            <div className='flex flex-col justify-around lg:flex-row'>
              <div className='flex flex-col'>
                <p className='px-6 py-2 text-lg font-bold text-black'>
                  Número del seguro:
                </p>
                {editMode ? (
                  <input
                    type='text'
                    name='policyUser'
                    value={editedDataProfile?.policyUser || ''}
                    onChange={handleInputChange}
                    className='w-70 rounded-full bg-white px-6 py-2 text-lg font-bold text-gray-400 lg:w-[280px]'
                  />
                ) : (
                  <div className='w-70 rounded-full bg-white px-6 py-2 lg:w-[280px]'>
                    <p className='text-lg font-bold text-gray-400'>
                      {userDataProfile && userDataProfile.policyUser
                        ? userDataProfile.policyUser
                        : ' Sin datos'}
                    </p>
                  </div>
                )}
              </div>
              <div className='flex flex-col'>
                <p className='px-6 py-2 text-lg font-bold text-black'>
                  Nombre de la aseguradora:
                </p>
                {editMode ? (
                  <input
                    type='text'
                    name='insuranceCompany'
                    value={editedDataProfile?.insuranceCompany || ''}
                    onChange={handleInputChange}
                    className='w-70 rounded-full bg-white px-6 py-2 text-lg font-bold text-gray-400 lg:w-[280px]'
                  />
                ) : (
                  <div className='w-70 rounded-full bg-white px-6 py-2 lg:w-[280px]'>
                    <p className='text-lg font-bold text-gray-400'>
                      {userDataProfile && userDataProfile.insuranceCompany
                        ? userDataProfile.insuranceCompany
                        : ' Sin datos'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </ToggleComponent>

          <ToggleComponent title='Alergías' editModeToggle={false}>
            <>
              {allergiesData && allergiesData.length > 0 ? (
                <div>
                  {allergiesData.map((allergy, index) => (
                    <div
                      key={index}
                      className='mb-2 flex flex-row items-center justify-around'
                    >
                      <p className='px-6 py-2 text-lg font-bold text-black'>
                        Nombre de la alergía:
                      </p>
                      <div className='w-70 flex items-center rounded-full bg-white px-6 py-2 lg:w-[280px]'>
                        <p className='text-lg font-bold text-gray-400'>
                          {allergy.name}
                        </p>
                      </div>
                      {editMode ? (
                        <>
                          <FiTrash2
                            className='ml-2 h-8 w-8 transform cursor-pointer text-red-500 transition duration-300 ease-in-out hover:scale-105 hover:text-red-800'
                            onClick={(e) => {
                              e.preventDefault()
                              DeleteAllergies(allergy.idAllergies)
                            }}
                          />
                          <FiEdit
                            className='ml-2 h-8 w-8 transform cursor-pointer text-blue-500 transition duration-300 ease-in-out hover:scale-105 hover:text-blue-800'
                            onClick={(e) => {
                              e.preventDefault()
                              handleEditClick(allergy, allergy.idAllergies)
                            }}
                          />
                        </>
                      ) : (
                        <FiInfo
                          className='ml-2 h-8 w-8 transform cursor-pointer text-gray-500 transition duration-300 ease-in-out hover:scale-105 hover:text-gray-800'
                          onClick={() => openModal(allergy)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className='items-center text-2xl text-black'>
                  No se han encontrado alergias.
                </p>
              )}
              {editMode ? (
                <div className='mr-5 flex justify-end'>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      openAllergyModal()
                    }}
                    className='mt-2 rounded-full bg-blue-500 px-4 py-1 text-3xl font-bold text-white hover:bg-blue-700'
                  >
                    +
                  </button>
                </div>
              ) : (
                ''
              )}
            </>
          </ToggleComponent>

          <ToggleComponent title='Discapacidades' editModeToggle={false}>
            <>
              {disabilityData && disabilityData.length > 0 ? (
                <div>
                  {disabilityData.map((disability, index) => (
                    <div
                      key={index}
                      className='mb-2 flex flex-row items-center justify-around'
                    >
                      <p className='px-6 py-2 text-lg font-bold text-black'>
                        Nombre de la dispacidad:
                      </p>
                      <div className='w-70 flex items-center rounded-full bg-white px-6 py-2 lg:w-[280px]'>
                        <p className='text-lg font-bold text-gray-400'>
                          {disability.name}
                        </p>
                      </div>
                      {editMode ? (
                        <>
                          <FiTrash2
                            className='ml-2 h-8 w-8 transform cursor-pointer text-red-500 transition duration-300 ease-in-out hover:scale-105 hover:text-red-800'
                            onClick={(e) => {
                              e.preventDefault()
                              DeleteDisability(disability.idDisability)
                            }}
                          />
                          <FiEdit
                            className='ml-2 h-8 w-8 transform cursor-pointer text-blue-500 transition duration-300 ease-in-out hover:scale-105 hover:text-blue-800'
                            onClick={(e) => {
                              e.preventDefault()
                              handleEditClickDisability(
                                disability,
                                disability.idDisability,
                              )
                            }}
                          />
                        </>
                      ) : (
                        <FiInfo
                          className='ml-2 h-8 w-8 transform cursor-pointer text-gray-500 transition duration-300 ease-in-out hover:scale-105 hover:text-gray-800'
                          onClick={() => openModalDisability(disability)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className='items-center text-2xl text-black'>
                  No se han encontrado discapacidades.
                </p>
              )}
              {editMode ? (
                <div className='mr-5 flex justify-end'>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      openDisabilityModal()
                    }}
                    className='mt-2 transform cursor-pointer rounded-full bg-blue-500 px-4 py-1 text-3xl font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700'
                  >
                    {' '}
                    +{' '}
                  </button>
                </div>
              ) : (
                ''
              )}
            </>
          </ToggleComponent>

          <ToggleComponent
            title='Enfermedades crónicas '
            editModeToggle={false}
          >
            <>
              {chronicalData && chronicalData.length > 0 ? (
                <div>
                  {chronicalData.map((chronical, index) => (
                    <div
                      key={index}
                      className='mb-2 flex flex-row items-center justify-around'
                    >
                      <p className='px-6 py-2 text-lg font-bold text-black'>
                        Nombre de la enfermedad:
                      </p>
                      <div className='w-70 flex items-center rounded-full bg-white px-6 py-2 lg:w-[280px]'>
                        <p className='text-lg font-bold text-gray-400'>
                          {chronical.name}
                        </p>
                      </div>
                      {editMode ? (
                        <>
                          <FiTrash2
                            className='ml-2 h-8 w-8 transform cursor-pointer text-red-500 transition duration-300 ease-in-out hover:scale-105 hover:text-red-800'
                            onClick={(e) => {
                              e.preventDefault()
                              DeleteChronical(chronical.idChronicalDesease)
                            }}
                          />
                          <FiEdit
                            className='ml-2 h-8 w-8 transform cursor-pointer text-blue-500 transition duration-300 ease-in-out hover:scale-105 hover:text-blue-800'
                            onClick={(e) => {
                              e.preventDefault()
                              handleEditClickChronical(
                                chronical,
                                chronical.idChronicalDesease,
                              )
                            }}
                          />
                        </>
                      ) : (
                        <FiInfo
                          className='ml-2 h-8 w-8 transform cursor-pointer text-gray-500 transition duration-300 ease-in-out hover:scale-105 hover:text-gray-800'
                          onClick={() => openModalChronical(chronical)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className='items-center text-2xl text-black'>
                  No se han encontrado enfermedades.
                </p>
              )}
              {editMode ? (
                <div className='mr-5 flex justify-end'>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      openChronicalModal()
                    }}
                    className='mt-2 transform cursor-pointer rounded-full bg-blue-500 px-4 py-1 text-3xl font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700'
                  >
                    {' '}
                    +{' '}
                  </button>
                </div>
              ) : (
                ''
              )}
            </>
          </ToggleComponent>

          <ToggleComponent title='Medicinas' editModeToggle={false}>
            {medicinesData && medicinesData.length > 0 ? (
              <div>
                {medicinesData.map((medicine, index) => (
                  <div
                    key={index}
                    className='mb-2 flex flex-row items-center justify-around'
                  >
                    <p className='px-6 py-2 text-lg font-bold text-black'>
                      Nombre de la medicina:
                    </p>
                    <div className='w-70 flex items-center rounded-full bg-white px-6 py-2 lg:w-[280px]'>
                      <p className='text-lg font-bold text-gray-400'>
                        {medicine.name}
                      </p>
                    </div>
                    {editMode ? (
                      <>
                        <FiTrash2
                          className='ml-2 h-8 w-8 transform cursor-pointer text-red-500 transition duration-300 ease-in-out hover:scale-105 hover:text-red-800'
                          onClick={(e) => {
                            e.preventDefault()
                            DeleteMedicines(medicine.idMedicines)
                          }}
                        />
                        <FiEdit
                          className='ml-2 h-8 w-8 transform cursor-pointer text-blue-500 transition duration-300 ease-in-out hover:scale-105 hover:text-blue-800'
                          onClick={(e) => {
                            e.preventDefault()
                            handleEditClickMedicines(
                              medicine,
                              medicine.idMedicines,
                            )
                          }}
                        />
                      </>
                    ) : (
                      <FiInfo
                        className='ml-2 h-8 w-8 transform cursor-pointer text-gray-500 transition duration-300 ease-in-out hover:scale-105 hover:text-gray-800'
                        onClick={() => openModalMedicines(medicine)}
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className='items-center text-2xl text-black'>
                No se han encontrado medicinas.
              </p>
            )}
            {editMode ? (
              <div className='mr-5 flex justify-end'>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    openMedicinesModal()
                  }}
                  className='mt-2 cursor-pointer rounded-full bg-blue-500 px-4 py-1 text-3xl font-bold text-white hover:bg-blue-700'
                >
                  {' '}
                  +{' '}
                </button>
              </div>
            ) : (
              ''
            )}
          </ToggleComponent>
        </div>

        {!editMode ? (
          <div className='mb-6 ml-2 flex lg:items-center lg:justify-center'>
            <button
              onClick={() => setEditMode(true)}
              className='mt-2 w-60 transform cursor-pointer rounded-full bg-blue-500 py-2 text-2xl text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700'
            >
              Editar
            </button>
          </div>
        ) : (
          <>
            <div className='mb-6 ml-2 flex lg:items-center lg:justify-center'>
              <button
                onClick={handleCancelEdit}
                className='mr-6 mt-2 w-60 transform cursor-pointer rounded-full bg-gray-300 px-3 py-2 text-2xl text-gray-800 transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-400'
              >
                Cancelar
              </button>
              <button
                type='submit'
                className='w-70 mt-2 transform cursor-pointer rounded-full bg-blue-500 px-3 py-2 text-2xl text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700'
              >
                Guardar Cambios
              </button>
            </div>
          </>
        )}

        {!editMode && (
          <button
            className='ml-2 text-lg font-bold text-red-600 hover:cursor-pointer hover:underline'
            onClick={() => {
              showDeleteAccountModal()
            }}
          >
            Desactivar cuenta
          </button>
        )}
      </form>

      {/* get modal */}
      <GetModal
        modalOpen={modalOpen && selectedAllergy != null}
        modalTitle='Alergia'
        modalContent={[
          {
            label: 'Nombre de la alergía:',
            value: selectedAllergy?.name || '',
          },
          {
            label: 'Reacción alérgica:',
            value: selectedAllergy?.reaction || '',
          },
        ]}
        onCloseButtonClick={closeModal}
      />

      <GetModal
        modalOpen={modalOpen2 && selectedDisability != null}
        modalTitle='Discapacidad'
        modalContent={[
          {
            label: 'Nombre de la alergía:',
            value: selectedDisability?.name || '',
          },
        ]}
        onCloseButtonClick={closeModalDisability}
      />

      <GetModal
        modalOpen={modalOpen3 && selectedChronical != null}
        modalTitle='Enfermedad crónica'
        modalContent={[
          {
            label: 'Nombre de la enfermedad:',
            value: selectedChronical?.name || '',
          },
        ]}
        onCloseButtonClick={closeModalChronical}
      />

      <GetModal
        modalOpen={modalOpen4 && selectedMedicines != null}
        modalTitle='Medicina'
        modalContent={[
          {
            label: 'Nombre de la medicina:',
            value: selectedMedicines?.name || '',
          },
          {
            label: 'Vía de administración:',
            value: selectedMedicines?.routeAdmin || '',
          },
          { label: 'Dosis:', value: selectedMedicines?.dose || '' },
          { label: 'Duración:', value: selectedMedicines?.duration || '' },
        ]}
        onCloseButtonClick={closeModalMedicines}
      />

      {/* Modal  POst */}
      <AddModal
        modalOpen={allergyModalOpen}
        editMode={editMode}
        closeModal={closeAllergyModal}
        handleAddItem={handleAddAllergy}
        item={newAllergy}
        handleItemChange={handleNewAllergyChange}
        title='Agregar Alergia'
        fields={[
          { name: 'name', placeholder: 'Nombre de la alergia' },
          { name: 'reaction', placeholder: 'Nombre de la reacción' },
        ]}
      />

      <AddModal
        modalOpen={disabilityModalOpen}
        editMode={editMode}
        closeModal={closeDisabilityModal}
        handleAddItem={handleAddDisability}
        item={newDisability}
        handleItemChange={handleNewDisabilityChange}
        title='Agregar Enfermedad'
        fields={[{ name: 'name', placeholder: 'Nombre de la discapacidad' }]}
      />

      <AddModal
        modalOpen={chronicalModalOpen}
        editMode={editMode}
        closeModal={closeChronicalModal}
        handleAddItem={handleAddChronical}
        item={newChronical}
        handleItemChange={handleNewChronicalChange}
        title='Agregar Enfermedad'
        fields={[{ name: 'name', placeholder: 'Nombre de la enfermedad' }]}
      />

      <AddModal
        modalOpen={medicinesModalOpen}
        editMode={editMode}
        closeModal={closeMedicinesModal}
        handleAddItem={handleAddMedicines}
        item={newMedicines}
        handleItemChange={handleNewMedicinesChange}
        title='Agregar Medicina'
        fields={[
          { name: 'name', placeholder: 'Nombre de la medicina' },
          { name: 'routeAdmin', placeholder: 'Vía de administración' },
          { name: 'dose', placeholder: 'Dosis' },
          { name: 'duration', placeholder: 'Duración' },
        ]}
      />

      {/* Modal de edición de alergia */}
      <EditModal
        editingData={editingAllergy}
        editMode={editMode}
        handleEdit={handleEditAllergy}
        closeModal={closeAllergyModal}
        fields={[
          { name: 'name', placeholder: 'Nombre de la alergia' },
          { name: 'reaction', placeholder: 'Reacción de la alergia' },
        ]}
        setEditingData={setEditingAllergy}
      />

      <EditModal
        editingData={editingDisability}
        editMode={editMode}
        handleEdit={handleEditDisability}
        closeModal={closeDisabilityModal}
        fields={[{ name: 'name', placeholder: 'Nombre de la discapacidad' }]}
        setEditingData={setEditingDisability}
      />

      <EditModal
        editingData={editingChronical}
        editMode={editMode}
        handleEdit={handleEditChronical}
        closeModal={closeChronicalModal}
        fields={[{ name: 'name', placeholder: 'Nombre de la enfermedad' }]}
        setEditingData={setEditingChronical}
      />

      <EditModal
        editingData={editingMedicines}
        editMode={editMode}
        handleEdit={handleEditMedicines}
        closeModal={closeMedicinesModal}
        fields={[
          { name: 'name', placeholder: 'Nombre de la medicina' },
          { name: 'routeAdmin', placeholder: 'Vía de administración' },
          { name: 'dose', placeholder: 'Dosis' },
          { name: 'duration', placeholder: 'Duración' },
        ]}
        setEditingData={setEditingMedicines}
      />
    </div>
  )
}

export default Profile
