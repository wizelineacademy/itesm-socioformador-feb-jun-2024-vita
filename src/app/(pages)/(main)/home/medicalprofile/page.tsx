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
import GetModal from '@/src/components/modal/getModal'
import AddModal from '@/src/components/modal/addModal'
import {
  confirmAndDelete,
  handleAddItem,
  handleEditItem,
  handleInput,
  showDeleteAccountModal,
} from '@/src/lib/profile/functions'
import EditModal from '@/src/components/modal/editModal'
import { useRouter } from 'next/navigation'
import ProfileField from '@/src/components/profile/ProfileField'
import ProfileFields from '@/src/components/profile/ProfileFields'
import DataListContainer from '@/src/components/profile/DataListContainer'

const Profile = () => {
  const router = useRouter()
  const [editMode, setEditMode] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [userDataProfile, setUserDataProfile] = useState<ProfileData | null>(
    null,
  )
  const [editedDataProfile, setEditedDataProfile] =
    useState<EditProfileData | null>(null)
  const [allergiesData, setAllergiesData] = useState<GetAllergiesData | null>(
    null,
  )
  const [selectedAllergy, setSelectedAllergy] = useState<AllergiesData | null>(
    null,
  )
  const [editingAllergy, setEditingAllergy] =
    useState<EditAllergiesData | null>(null)
  const [newAllergy, setNewAllergy] = useState<AllergiesData>({
    name: '',
    reaction: '',
  })
  const [disabilityData, setDisabilityData] =
    useState<GetDisabilityData | null>(null)
  const [selectedDisability, setSelectedDisability] =
    useState<DisabilityData | null>(null)
  const [editingDisability, setEditingDisability] =
    useState<EditDisabilityData | null>(null)
  const [newDisability, setNewDisability] = useState<DisabilityData>({
    name: '',
  })
  const [chronicalData, setChronicalData] = useState<GetChronicalData | null>(
    null,
  )
  const [selectedChronical, setSelectedChronical] =
    useState<ChronicalData | null>(null)
  const [editingChronical, setEditingChronical] =
    useState<EditChronicalData | null>(null)
  const [newChronical, setNewChronical] = useState<ChronicalData>({ name: '' })
  const [medicinesData, setMedicinesData] = useState<GetMedicinesData | null>(
    null,
  )
  const [selectedMedicines, setSelectedMedicines] =
    useState<MedicinesData | null>(null)
  const [editingMedicines, setEditingMedicines] =
    useState<EditMedicinesData | null>(null)
  const [newMedicines, setNewMedicines] = useState<MedicinesData>({
    name: '',
    routeAdmin: '',
    dose: '',
    duration: '',
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [modalOpen2, setModalOpen2] = useState(false)
  const [modalOpen3, setModalOpen3] = useState(false)
  const [modalOpen4, setModalOpen4] = useState(false)
  const [allergyModalOpen, setAllergyModalOpen] = useState(false)
  const [disabilityModalOpen, setDisabilityModalOpen] = useState(false)
  const [chronicalModalOpen, setChronicalModalOpen] = useState(false)
  const [medicinesModalOpen, setMedicinesModalOpen] = useState(false)

  const handleEditClick = (allergy: AllergiesData, allergyId: number) => {
    const editedAllergyData: EditAllergiesData = {
      idAllergies: allergyId,
      name: allergy.name,
      reaction: allergy.reaction,
    }
    setEditingAllergy(editedAllergyData)
    openAllergyModal()
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
      closeModals,
      getData,
      setEditingAllergy,
    )
  }

  const handleNewAllergyChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    handleInput(event, setNewAllergy)
  }

  const handleAddAllergy = async () => {
    await handleAddItem(
      newAllergy,
      'una nueva alergia',
      editedDataProfile,
      async (allergyData) => {
        return await axios.post('/api/profile/allergies', allergyData)
      },
      reset,
      closeModals,
      getData,
    )
  }

  const handleAddDisability = async () => {
    await handleAddItem(
      newDisability,
      'una nueva discapacidad',
      editedDataProfile,
      async (disabilityData) => {
        return await axios.post('/api/profile/disabilities', disabilityData)
      },
      reset,
      closeModals,
      getData,
    )
  }

  const handleAddMedicines = async () => {
    await handleAddItem(
      newMedicines,
      'una nueva medicina',
      editedDataProfile,
      async (medicinesData) => {
        return await axios.post('/api/profile/medicines', medicinesData)
      },
      reset,
      closeModals,
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
      const [response, response2] = await Promise.all([
        axios.get('/api/profile'),
        axios.get('/api/profile/userData'),
      ])
      const fetchedData = response.data
      const fetchedData2 = response2.data
      setUserData(fetchedData)
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
      const [allergies, disability, chronical, medicines] = await Promise.all([
        axios.get(`/api/profile/allergies/${fetchedData2.idMedicalProfile}`),
        axios.get(`/api/profile/disabilities/${fetchedData2.idMedicalProfile}`),
        axios.get(
          `/api/profile/chronicalDesease/${fetchedData2.idMedicalProfile}`,
        ),
        axios.get(`/api/profile/medicines/${fetchedData2.idMedicalProfile}`),
      ])
      setAllergiesData(allergies.data)
      setDisabilityData(disability.data)
      setChronicalData(chronical.data)
      setMedicinesData(medicines.data)
    } catch (error) {
      console.log(error)
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
      closeModals,
      getData,
      setEditingDisability,
    )
  }

  const handleAddChronical = async () => {
    await handleAddItem(
      newChronical,
      'una nueva enfermedad crónica',
      editedDataProfile,
      async (chronicalData) => {
        return await axios.post('/api/profile/chronicalDesease', chronicalData)
      },
      reset,
      closeModals,
      getData,
    )
  }

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
      closeModals,
      getData,
      setEditingChronical,
    )
  }

  const handleNewDisabilityChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    handleInput(event, setNewDisability)
  }
  const handleNewChronicalChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    handleInput(event, setNewChronical)
  }

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
      closeModals,
      getData,
      setEditingMedicines,
    )
  }

  const handleNewMedicinesChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    handleInput(event, setNewMedicines)
  }

  const openModalAllergy = (allergy: AllergiesData) => {
    setSelectedAllergy(allergy)
    setModalOpen(true)
  }

  const openModalDisability = (disability: DisabilityData) => {
    setSelectedDisability(disability)
    setModalOpen2(true)
  }

  const openModalChronical = (chronical: ChronicalData) => {
    setSelectedChronical(chronical)
    setModalOpen3(true)
  }

  const openModalMedicines = (medicines: MedicinesData) => {
    setSelectedMedicines(medicines)
    setModalOpen4(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setModalOpen2(false)
    setModalOpen3(false)
    setModalOpen4(false)
  }

  const openAllergyModal = () => setAllergyModalOpen(true)
  const openDisabilityModal = () => setDisabilityModalOpen(true)
  const openChronicalModal = () => setChronicalModalOpen(true)
  const openMedicinesModal = () => setMedicinesModalOpen(true)

  const closeModals = () => {
    reset()
    setAllergyModalOpen(false)
    setEditingAllergy(null)
    setDisabilityModalOpen(false)
    setEditingDisability(null)
    setChronicalModalOpen(false)
    setEditingChronical(null)
    setMedicinesModalOpen(false)
    setEditingMedicines(null)
    getData()
  }

  const reset = () => {
    setNewAllergy({ name: '', reaction: '' })
    setNewDisability({ name: '' })
    setNewChronical({ name: '' })
    setNewMedicines({ name: '', routeAdmin: '', dose: '', duration: '' })
  }

  const deleteItem = async (
    id: number,
    itemType: string,
    apiEndpoint: string,
  ) => {
    await confirmAndDelete(id, itemType, async (id) => {
      return await axios.delete(`${apiEndpoint}/${id}`)
    })
    getData()
  }

  return (
    <div className='mb-4'>
      <div className='mt-4 flex justify-start text-5xl font-bold text-white sm:justify-center sm:px-5 sm:py-4 md:justify-start lg:justify-start'>
        <h1 className='mr-2 w-[800px] pl-2 text-title-profile sm:pl-0'>
          Perfil
        </h1>
      </div>
      <ProfileFields
        editMode={editMode}
        editedDataProfile={editedDataProfile}
        userData={userData}
        userDataProfile={userDataProfile}
        handleInputChange={handleInputChange}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSaveChanges()
        }}
      >
        <div className='mt-4 pl-2'>
          <ToggleComponent title='Contacto ' editModeToggle={false}>
            <div className='flex flex-col justify-around lg:flex-row'>
              <ProfileField
                label='Nombre del contacto:'
                value={
                  editMode
                    ? editedDataProfile?.emergencyName
                    : userDataProfile?.emergencyName
                }
                editMode={editMode}
                name='emergencyName'
                onChange={handleInputChange}
                darkMode={true}
              />
              <ProfileField
                label='Teléfono del contacto:'
                value={
                  editMode
                    ? editedDataProfile?.emergencyPhone
                    : userDataProfile?.emergencyPhone
                }
                editMode={editMode}
                name='emergencyPhone'
                onChange={handleInputChange}
                darkMode={true}
                min='10'
              />
            </div>
          </ToggleComponent>

          <ToggleComponent title='Póliza' editModeToggle={false}>
            <div className='flex flex-col justify-around lg:flex-row'>
              <ProfileField
                label='Número del seguro:'
                value={
                  editMode
                    ? editedDataProfile?.policyUser
                    : userDataProfile?.policyUser
                }
                editMode={editMode}
                name='policyUser'
                onChange={handleInputChange}
                darkMode={true}
              />
              <ProfileField
                label='Nombre de la aseguradora:'
                value={
                  editMode
                    ? editedDataProfile?.insuranceCompany
                    : userDataProfile?.insuranceCompany
                }
                editMode={editMode}
                name='insuranceCompany'
                onChange={handleInputChange}
                darkMode={true}
              />
            </div>
          </ToggleComponent>

          <DataListContainer
            editMode={editMode}
            allergiesData={allergiesData}
            disabilityData={disabilityData}
            chronicalData={chronicalData}
            medicinesData={medicinesData}
            deleteItem={deleteItem}
            handleEditClick={handleEditClick}
            handleEditClickDisability={handleEditClickDisability}
            handleEditClickChronical={handleEditClickChronical}
            handleEditClickMedicines={handleEditClickMedicines}
            openModalAllergy={openModalAllergy}
            openModalDisability={openModalDisability}
            openModalChronical={openModalChronical}
            openModalMedicines={openModalMedicines}
            openAllergyModal={openAllergyModal}
            openDisabilityModal={openDisabilityModal}
            openChronicalModal={openChronicalModal}
            openMedicinesModal={openMedicinesModal}
          />
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
        onCloseButtonClick={closeModal}
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
        onCloseButtonClick={closeModal}
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
        onCloseButtonClick={closeModal}
      />

      <AddModal
        modalOpen={allergyModalOpen}
        editMode={editMode}
        closeModal={closeModals}
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
        closeModal={closeModals}
        handleAddItem={handleAddDisability}
        item={newDisability}
        handleItemChange={handleNewDisabilityChange}
        title='Agregar Enfermedad'
        fields={[{ name: 'name', placeholder: 'Nombre de la discapacidad' }]}
      />

      <AddModal
        modalOpen={chronicalModalOpen}
        editMode={editMode}
        closeModal={closeModals}
        handleAddItem={handleAddChronical}
        item={newChronical}
        handleItemChange={handleNewChronicalChange}
        title='Agregar Enfermedad'
        fields={[{ name: 'name', placeholder: 'Nombre de la enfermedad' }]}
      />

      <AddModal
        modalOpen={medicinesModalOpen}
        editMode={editMode}
        closeModal={closeModals}
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

      <EditModal
        editingData={editingAllergy}
        editMode={editMode}
        handleEdit={handleEditAllergy}
        closeModal={closeModals}
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
        closeModal={closeModals}
        fields={[{ name: 'name', placeholder: 'Nombre de la discapacidad' }]}
        setEditingData={setEditingDisability}
      />

      <EditModal
        editingData={editingChronical}
        editMode={editMode}
        handleEdit={handleEditChronical}
        closeModal={closeModals}
        fields={[{ name: 'name', placeholder: 'Nombre de la enfermedad' }]}
        setEditingData={setEditingChronical}
      />

      <EditModal
        editingData={editingMedicines}
        editMode={editMode}
        handleEdit={handleEditMedicines}
        closeModal={closeModals}
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
