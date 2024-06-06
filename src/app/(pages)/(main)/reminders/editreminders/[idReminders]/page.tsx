'use client'
import React, { useState, useEffect } from 'react'
import { FaBell } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Swal from 'sweetalert2'
import {
  calculateDays,
  calculateHours,
  calculateHoursTime,
  formatDays,
  formatDaysUTC,
} from '@/src/lib/DaysFormat/days'
import { EditReminderData, ReminderData } from '@/src/data/datatypes/reminder'

const EditReminders = ({ params }: { params: { idReminders: string } }) => {
  const router = useRouter()

  const idReminders = params.idReminders
  const [editMode, setEditMode] = useState(false)
  const [userData, setUserData] = useState<ReminderData | null>(null)
  const [editedData, setEditedData] = useState<EditReminderData | null>(null)
  const [selectedOption, setSelectedOption] = useState('I')

  const DeleteReminder = async (idReminders: string) => {
    // Mostrar mensaje de confirmación
    const confirmationResult = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este recordatorio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    })

    // Si el usuario confirma la eliminación
    if (confirmationResult.isConfirmed) {
      try {
        const response = await axios.delete(`/api/reminders/${idReminders}`)
        if (response.status === 200) {
          router.replace('/reminders')
          router.refresh()
          Swal.fire({
            title: 'Éxito',
            text: 'El recordatorio ha sido eliminado exitosamente',
            icon: 'success',
            confirmButtonText: 'OK',
          })
        }
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al eliminar el recordatorio',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    }
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
  }

  const getData = async () => {
    try {
      const response = await axios.get(`/api/reminders/${idReminders}`)
      const fetchedData = response.data
      // Determinar el valor inicial de selectedOption
      const initialSelectedOption = fetchedData.endTime === null ? 'I' : 'D'
      setSelectedOption(initialSelectedOption)

      setUserData({
        ...fetchedData,
        frequencyDays: calculateDays(fetchedData.frequency),
        frequencyHours: calculateHours(fetchedData.frequency),
        startDays: fetchedData.startTime,
        startHours: calculateHoursTime(fetchedData.startTime),
        endDays: fetchedData.endTime ? fetchedData.endTime : null,
        endHours: fetchedData.endTime
          ? calculateHoursTime(fetchedData.endTime)
          : null,
      })

      setEditedData({
        ...fetchedData,
        frequencyDays: calculateDays(fetchedData.frequency),
        frequencyHours: calculateHours(fetchedData.frequency),
        startDays: fetchedData.startTime,
        startHours: calculateHoursTime(fetchedData.startTime),
        endDays: fetchedData.endTime ? fetchedData.endTime : null,
        endHours: fetchedData.endTime
          ? calculateHoursTime(fetchedData.endTime)
          : null,
      })
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

  // Función para cancelar la edición y volver a los datos originales
  const handleCancelEdit = () => {
    setEditMode(false)
    setEditedData(userData) // Restaura los datos editados a los datos originales
  }

  // Función para manejar el cambio en los inputs
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target

    // Validamos si hay datos editados y los actualizamos
    if (editedData) {
      setEditedData({ ...editedData, [name]: value })
    }
  }

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target

    // Validamos si hay datos editados y los actualizamos
    if (editedData) {
      setEditedData({ ...editedData, [name]: value })
    }
  }

  // Función para guardar los cambios editados
  const handleSaveChanges = async () => {
    try {
      if (editedData) {
        // Convertir horas y días a segundos y sumarlos
        const frequencyInSeconds =
          editedData.frequencyHours * 3600 + editedData.frequencyDays * 86400

        // Combinar fecha y hora de inicio
        if (editedData.startDays.includes('T')) {
          editedData.startDays = editedData.startDays.split('T')[0]
        }
        const startTime = new Date(
          editedData.startDays + 'T' + editedData.startHours,
        )
        // Validar que startTime no sea menor que el día actual

        const currentDate = new Date()
        if (startTime < currentDate) {
          Swal.fire({
            title: 'Error',
            text: 'Asegurese que la fecha y hora inicio sean mayores mayores a la hora y fecha actual ',
            icon: 'error',
            confirmButtonText: 'OK',
          })
          return
        }

        // Combinar fecha y hora de fin si está definido
        let endTime = null
        if (editedData.endDays && editedData.endHours) {
          endTime = new Date(editedData.endDays + 'T' + editedData.endHours)
          // Validar que endTime no sea menor que startTime
          if (endTime < startTime) {
            Swal.fire({
              title: 'Error',
              text: 'Asegurese que la fecha y hora fin sean mayores mayores a la hora y fecha de inicio ',
              icon: 'error',
              confirmButtonText: 'OK',
            })
            return
          }
        }
        await axios.put(`/api/reminders/${idReminders}`, {
          ...editedData,
          frequency: frequencyInSeconds,
          startTime,
          endTime: selectedOption === 'I' ? null : endTime,
        })

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

  return (
    <>
      <div className='flex flex-row justify-center px-5 py-4 text-4xl font-bold md:justify-start lg:justify-start'>
        <h1 className='mr-6 w-[200px] text-white'>Recordatorio</h1>
        <FaBell size={36} color='white' />
      </div>
      <div className='flex flex-col justify-center px-5 md:justify-start lg:justify-start'>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSaveChanges()
          }}
        >
          <h2 className='text-3xl text-white'>Nombre</h2>
          {editMode ? (
            <input
              type='text'
              name='name'
              value={editedData?.name || ''}
              onChange={handleInputChange}
              className='mt-4 w-[85%] rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'
              required
            />
          ) : (
            <div className='mt-4 w-[85%] rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'>
              {userData && userData.name}
            </div>
          )}
          <h2 className='mt-4 text-3xl text-white'>Descripción</h2>
          {editMode ? (
            <textarea
              id='Comentarios'
              required
              placeholder='Describe el recordatorio...'
              className='mt-4 h-[100px] w-[85%] resize-none rounded-3xl bg-reminders-input px-4 py-2 text-white'
              name='description'
              value={editedData?.description || ''}
              onChange={handleTextAreaChange}
            />
          ) : (
            <div className='mt-4 h-[100px] w-[85%] overflow-auto rounded-3xl bg-reminders-input px-4 py-2 text-white'>
              {userData && userData.description}
            </div>
          )}
          <h2 className='mt-4 text-3xl text-white'>Frecuencia</h2>
          <div className='flex flex-col justify-between md:flex-row'>
            <div className='mt-4 flex flex-col'>
              <h2 className='mb-4 text-2xl text-white'>Número de horas</h2>
              {editMode ? (
                <input
                  type='number'
                  name='frequencyHours'
                  value={editedData?.frequencyHours}
                  onChange={handleInputChange}
                  className='mt-4 w-60 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'
                  required
                  min={1}
                  max={12}
                />
              ) : (
                <div className='mt-4 w-60 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'>
                  {userData && userData.frequencyHours}
                </div>
              )}
            </div>
            <div className='mt-4 flex flex-col lg:w-3/4'>
              <h2 className='mb-4 text-2xl text-white'>Número de días</h2>
              {editMode ? (
                <input
                  type='number'
                  name='frequencyDays'
                  value={editedData?.frequencyDays}
                  onChange={handleInputChange}
                  min={0}
                  max={7}
                  className='mt-4 w-60 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'
                  required
                />
              ) : (
                <div className='mt-4 w-60 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'>
                  {userData && userData.frequencyDays}
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-col justify-between md:flex-row'>
            <h2 className='mt-4 text-3xl text-white'>Inicio</h2>
            <div className='flex w-1/2 flex-row'>
              <h2 className='mr-6 mt-4 text-3xl text-white'>Fin</h2>
              {editMode ? (
                <select
                  className='mt-4 w-60 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'
                  value={selectedOption}
                  onChange={handleSelectChange}
                  required
                >
                  <option value='I'>Indefinido</option>
                  <option value='D'>Definido</option>
                </select>
              ) : (
                <div className='mt-4 w-60 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'>
                  {userData && userData.endDays ? 'Definido' : 'Indefinido'}
                </div>
              )}
            </div>
          </div>

          <div className='flex flex-col justify-between lg:flex-row'>
            <div className='flex flex-col justify-between md:flex-row lg:gap-16'>
              <div className='mt-4 flex flex-col'>
                <h2 className='mb-4 text-2xl text-white'>Fecha de Inicio</h2>
                {editMode ? (
                  <input
                    type='date'
                    name='startDays'
                    className='w-50 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'
                    value={formatDaysUTC(editedData?.startDays || '')}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <div className='mt-4 w-60 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'>
                    {userData && formatDays(userData.startDays)}
                  </div>
                )}
              </div>
              <div className='mt-4 flex flex-col'>
                <h2 className='mb-4 text-2xl text-white'>Hora de Inicio</h2>
                {editMode ? (
                  <input
                    type='time'
                    name='startHours'
                    className='w-50 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'
                    value={editedData?.startHours || ''}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <div className='mt-4 w-60 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'>
                    {userData && userData.startHours}
                  </div>
                )}
              </div>
              <div className='mt-4 flex flex-col'>
                {editMode ? (
                  <>
                    {selectedOption === 'D' && (
                      <>
                        <h2 className='mb-4 text-2xl text-white'>
                          Fecha de fin
                        </h2>
                        <input
                          type='date'
                          name='endDays'
                          className='w-50 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'
                          value={formatDaysUTC(editedData?.endDays || '')}
                          onChange={handleInputChange}
                          required
                        />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {userData && userData.endDays && (
                      <>
                        <h2 className='mb-4 text-2xl text-white'>
                          Fecha de fin
                        </h2>

                        <div className='mt-4 w-60 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'>
                          {formatDays(userData.endDays)}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
              <div className='mt-4 flex flex-col'>
                {editMode ? (
                  <>
                    {selectedOption === 'D' && (
                      <>
                        <h2 className='mb-4 text-2xl text-white'>
                          Hora de fin
                        </h2>
                        <input
                          type='time'
                          name='endHours'
                          className='w-50 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'
                          value={editedData?.endHours || ''}
                          onChange={handleInputChange}
                          required
                        />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {userData && userData.endDays && (
                      <>
                        <h2 className='mb-4 text-2xl text-white'>
                          Fecha de fin
                        </h2>

                        <div className='mt-4 w-60 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'>
                          {userData && userData.endHours}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          {!editMode ? (
            <div className='mb-6 ml-2 flex lg:items-center lg:justify-center'>
              <span>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    DeleteReminder(idReminders)
                  }}
                  className='mr-6 mt-2 w-40 transform cursor-pointer rounded-full bg-mid-red px-3 py-2 text-2xl text-white transition duration-300 ease-in-out hover:scale-105 hover:text-red-800 md:w-60'
                >
                  Eliminar
                </button>
              </span>
              <span>
                <button
                  onClick={() => setEditMode(true)}
                  className='mr-6 mt-2 w-40 transform cursor-pointer rounded-full bg-blue-500 px-3 py-2 text-2xl text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 md:w-60'
                >
                  Editar
                </button>
              </span>
            </div>
          ) : (
            <>
              <div className='mb-6 ml-2 flex lg:items-center lg:justify-center'>
                <button
                  onClick={handleCancelEdit}
                  className='mr-6 mt-2 w-60 transform cursor-pointer rounded-full bg-gray-300 px-3 py-2 text-2xl text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-400'
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
        </form>
      </div>
    </>
  )
}

export default EditReminders
