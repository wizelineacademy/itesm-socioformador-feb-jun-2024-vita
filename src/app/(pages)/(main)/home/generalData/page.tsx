'use client'
import Swal from 'sweetalert2'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { formatDays, formatDaysUTC } from '@/src/lib/DaysFormat/days'
import { EditHealthData, HealthData } from '@/src/data/datatypes/healthdata'
const GeneralData = () => {
  const [userData, setUserData] = useState<HealthData | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [editedData, setEditedData] = useState<EditHealthData | null>(null)

  // Obtener la fecha actual
  const currentDate = new Date()
  // Calcular la fecha mínima permitida (15 años atrás desde la fecha actual)
  const minDate = new Date(
    currentDate.getFullYear() - 15,
    currentDate.getMonth(),
    currentDate.getDate(),
  )

  useEffect(() => {
    // Guardar la fecha mínima permitida en el estado
    getData()
  }, [])

  // Función para manejar el cambio en los inputs
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    if (editedData) {
      // Validar si se está editando la fecha de nacimiento
      if (name === 'birthDate') {
        const selectedDate = new Date(value)
        // Validar si la fecha seleccionada es menor a 15 años antes de la fecha actual
        if (selectedDate > minDate) {
          Swal.fire({
            title: 'Error',
            text: 'La fecha de nacimiento no puede ser menor a 15 años antes de la fecha actual',
            icon: 'error',
            confirmButtonText: 'OK',
          })
          return // Salir de la función si la fecha no es válida
        }
        // Si la fecha es válida, actualizar los datos editados
        const formattedDate = selectedDate.toISOString().split('T')[0]
        setEditedData({ ...editedData, [name]: formattedDate })
      } else {
        // Para otros campos que no sean fecha de nacimiento
        setEditedData({ ...editedData, [name]: value })
      }
    }
  }

  const getData = async () => {
    try {
      const response = await axios.get('/api/healthdata')
      const fetchedData = response.data

      setUserData(fetchedData)
      setEditedData(fetchedData)
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al recuperar los datos',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  // Función para guardar los cambios editados
  const handleSaveChanges = async () => {
    try {
      if (editedData) {
        await axios.post('/api/healthdata', editedData)

        Swal.fire({
          title: 'Éxito',
          text: 'Se han guardado las datos con éxito',
          icon: 'success',
          confirmButtonText: 'OK',
        })
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

  // Función para cancelar la edición y volver a los datos originales
  const handleCancelEdit = () => {
    setEditMode(false)
    setEditedData(userData) // Restaura los datos editados a los datos originales
  }

  return (
    <>
      <div className='flex justify-start px-5 py-4 text-5xl font-bold md:justify-start lg:justify-start'>
        <h1 className='text-home-title lg:mr-2'> Datos Generales </h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSaveChanges()
        }}
      >
        <div className='lg:space-x-30 flex flex-col justify-center lg:flex-row'>
          <div className='flex flex-col'>
            <div className='mr-2 px-5 py-4'>
              <div className='mt-6 text-3xl text-black'>
                <p className='mb-6 font-bold'>Peso</p>
                {editMode ? (
                  <span className='flex flex-row'>
                    <input
                      type='number'
                      name='weight'
                      value={editedData?.weight || ''}
                      onChange={handleInputChange}
                      className='w-60 rounded-full bg-input-home px-6 py-2 text-2xl'
                      min={0.1}
                      max={200.0}
                      required
                      step='0.01'
                    />
                    <p className='ml-4 font-bold'>kg</p>
                  </span>
                ) : (
                  <span className='flex flex-row'>
                    <div className='w-60 rounded-full bg-input-home px-6 py-2 text-2xl'>
                      {userData && userData.weight}
                    </div>
                    <p className='ml-4 font-bold'>kg</p>
                  </span>
                )}
              </div>
            </div>

            <div className='mr-2 px-5 py-4'>
              <div className='mt-6 text-3xl text-black'>
                <p className='mb-6 font-bold'>Sexo</p>
                {editMode ? (
                  <select
                    name='sex'
                    value={editedData?.sex || ''}
                    onChange={handleInputChange}
                    className='w-60 rounded-full bg-input-home px-6 py-2 text-2xl'
                    required
                  >
                    <option value='M'>Masculino</option>
                    <option value='F'>Femenino</option>
                  </select>
                ) : (
                  <span className='flex flex-row'>
                    <div className='w-60 rounded-full bg-input-home px-6 py-2 text-2xl'>
                      {userData &&
                        (userData.sex === 'M' ? 'Masculino' : 'Femenino')}
                    </div>
                  </span>
                )}
              </div>
            </div>

            <div className='mr-2 px-5 py-4'>
              <div className='mt-6 text-3xl text-black'>
                <p className='mb-6 font-bold'>Grasa Corporal</p>
                {editMode ? (
                  <input
                    type='number'
                    name='bodyFat'
                    value={editedData?.bodyFat || ''}
                    onChange={handleInputChange}
                    className='w-60 rounded-full bg-input-home px-6 py-2 text-2xl'
                    min={1}
                    max={60}
                    required
                  />
                ) : (
                  <span className='flex flex-row'>
                    <div className='w-60 rounded-full bg-input-home px-6 py-2 text-2xl'>
                      {userData && userData.bodyFat
                        ? userData.bodyFat
                        : 'Sin información'}
                    </div>
                    <p className='ml-4 font-bold'>%</p>
                  </span>
                )}
              </div>
            </div>

            {/* Resto de los campos con un formato similar */}
          </div>{' '}
          {/* columna*/}
          <div className='flex flex-col'>
            <div className='mr-2 px-5 py-4'>
              <div className='mt-6 text-3xl text-black'>
                <p className='mb-6 font-bold'>Altura</p>
                {editMode ? (
                  <span className='flex flex-row'>
                    <input
                      type='number'
                      name='height'
                      value={editedData?.height || ''}
                      onChange={handleInputChange}
                      className='w-60 rounded-full bg-input-home px-6 py-2 text-2xl'
                      min={0.5}
                      max={2.8}
                      required
                      step='0.01'
                    />
                    <p className='ml-4 font-bold'>m</p>
                  </span>
                ) : (
                  <span className='flex flex-row'>
                    <div className='w-60 rounded-full bg-input-home px-6 py-2 text-2xl'>
                      {userData && userData.height}
                    </div>
                    <p className='ml-4 font-bold'>m</p>
                  </span>
                )}
              </div>
            </div>

            <div className='mr-2 px-5 py-4'>
              <div className='mt-6 text-3xl text-black'>
                <p className='mb-6 font-bold'>Fecha de Nacimiento</p>
                {editMode ? (
                  <span className='flex flex-row'>
                    <input
                      type='date'
                      name='birthDate'
                      value={formatDaysUTC(editedData?.birthDate || '')}
                      onChange={handleInputChange}
                      className='w-60 rounded-full bg-input-home px-6 py-2 text-2xl'
                      required
                    />
                  </span>
                ) : (
                  <span className='flex flex-row'>
                    <div className='w-60 rounded-full bg-input-home px-6 py-2 text-2xl'>
                      {userData && formatDays(userData.birthDate)}
                    </div>
                  </span>
                )}
              </div>
            </div>

            <div className='mr-2 px-5 py-4'>
              <div className='mt-6 text-3xl text-black'>
                <p className='mb-6 font-bold'>Masa muscular</p>
                {editMode ? (
                  <span className='flex flex-row'>
                    <input
                      type='number'
                      name='muscularMass'
                      value={editedData?.muscularMass || ''}
                      onChange={handleInputChange}
                      className='w-60 rounded-full bg-input-home px-6 py-2 text-2xl'
                      min={1}
                      max={80}
                      required
                    />
                  </span>
                ) : (
                  <span className='flex flex-row'>
                    <div className='w-60 rounded-full bg-input-home px-6 py-2 text-2xl'>
                      {userData && userData.muscularMass
                        ? userData.muscularMass
                        : 'Sin información'}
                    </div>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>{' '}
        {/* general*/}
        {/* Botones de editar, guardar cambios y cancelar */}
        {!editMode ? (
          <div className='mb-6 ml-2 flex lg:items-center lg:justify-center'>
            <button
              type='button'
              onClick={() => setEditMode(true)}
              className='mt-2 w-60 rounded-full bg-button-home py-2 text-2xl text-white'
            >
              Editar
            </button>
          </div>
        ) : (
          <>
            <div className='mb-6 ml-2 flex lg:items-center lg:justify-center'>
              <button
                type='button'
                onClick={handleCancelEdit}
                className='mr-6 mt-2 w-60 rounded-full bg-mid-red px-3 py-2 text-2xl text-white'
              >
                Cancelar
              </button>
              <button
                type='submit'
                className='w-70 mt-2 rounded-full bg-button-home px-3 py-2 text-2xl text-white'
              >
                Guardar Cambios
              </button>
            </div>
          </>
        )}
      </form>
    </>
  )
}

export default GeneralData
