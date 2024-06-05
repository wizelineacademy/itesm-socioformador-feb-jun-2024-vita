'use client'

import React, { useState } from 'react'
import { FaBell } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import './remindersStyle.css'

const CrudReminders = () => {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState('I')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequencyHours: 0,
    frequencyDays: 0,
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  })

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // Convertir horas y días a segundos y sumarlos
      const frequencyInSeconds =
        formData.frequencyHours * 3600 + formData.frequencyDays * 86400

      // Combinar fecha y hora de inicio
      const startTime = new Date(formData.startDate + 'T' + formData.startTime)
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
      if (formData.endDate && formData.endTime) {
        endTime = new Date(formData.endDate + 'T' + formData.endTime)
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

      await axios.post('/api/reminders', {
        ...formData,
        frequency: frequencyInSeconds,
        startTime,
        endTime,
      })

      Swal.fire({
        title: 'Éxito',
        text: 'El recordatorio se ha creado con éxito',
        icon: 'success',
        confirmButtonText: 'OK',
      })
      router.replace('/reminders')
      router.refresh()
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al crear el recordatorio',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  return (
    <>
      <div className='flex flex-row justify-center px-5 py-4 text-4xl font-bold md:justify-start lg:justify-start'>
        <h1 className='mr-2 w-[200px] text-white'>Crea un recordatorio</h1>
        <FaBell size={36} color='white' />
      </div>
      <div className='flex flex-col justify-center px-5 md:justify-start lg:justify-start'>
        <form onSubmit={handleSubmit}>
          <h2 className='text-3xl text-white'>Nombre</h2>
          <input
            required
            placeholder='Paracetamol'
            className='mt-4 w-[85%] rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
          <h2 className='mt-4 text-3xl text-white'>Descripción</h2>
          <textarea
            id='Comentarios'
            required
            placeholder='Describe el recordatorio...'
            className='mt-4 h-[100px] w-[85%] resize-none rounded-3xl bg-reminders-input px-4 py-2 text-white'
            name='description'
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          <h2 className='mt-4 text-3xl text-white'>Frecuencia</h2>
          <div className='flex flex-row justify-between'>
            <div className='mt-4 flex flex-col'>
              <h2 className='mb-4 text-2xl text-white'>Número de horas</h2>
              <input
                type='number'
                name='frequencyHours'
                placeholder='0'
                className='w-40 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'
                min={1}
                max={12}
                value={formData.frequencyHours}
                onChange={handleChange}
                required
              />
            </div>
            <div className='mt-4 flex flex-col lg:w-3/4'>
              <h2 className='mb-4 text-2xl text-white'>Número de días</h2>
              <input
                type='number'
                name='frequencyDays'
                placeholder='0'
                className='w-40 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'
                min={0}
                max={7}
                value={formData.frequencyDays}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className='flex flex-row justify-between'>
            <h2 className='mt-4 text-3xl text-white'>Inicio</h2>
            <div className='flex w-1/2 flex-row'>
              <h2 className='mr-6 mt-4 text-3xl text-white'>Fin</h2>
              <select
                name='time'
                className='mt-4 w-60 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'
                value={selectedOption}
                onChange={handleSelectChange}
                required
              >
                <option value='I'>Indefinido</option>
                <option value='D'>Definido</option>
              </select>
            </div>
          </div>

          <div className='flex flex-col justify-between lg:flex-row'>
            <div className='flex flex-row justify-between lg:gap-16'>
              <div className='mt-4 flex flex-col'>
                <h2 className='mb-4 text-2xl text-white'>Fecha de Inicio</h2>
                <input
                  type='date'
                  name='startDate'
                  placeholder='0'
                  className='w-50 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='mt-4 flex flex-col'>
                <h2 className='mb-4 text-2xl text-white'>Hora de Inicio</h2>
                <input
                  type='time'
                  name='startTime'
                  placeholder='0'
                  className='w-50 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {selectedOption === 'D' && (
              <div className='flex flex-row justify-between lg:gap-16'>
                <div className='mt-4 flex flex-col'>
                  <h2 className='mb-4 text-2xl text-white'>Fecha Fin</h2>
                  <input
                    type='date'
                    name='endDate'
                    placeholder='0'
                    className='w-50 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='mt-4 flex flex-col'>
                  <h2 className='mb-4 text-2xl text-white'>Hora de Fin</h2>
                  <input
                    type='time'
                    name='endTime'
                    placeholder='0'
                    className='w-50 rounded-full bg-reminders-input px-6 py-2 text-2xl text-white'
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}
          </div>
          <div className='flex justify-center lg:justify-end'>
            <button className='mt-4 w-[280px] transform cursor-pointer rounded-3xl bg-blue-500 px-4 py-2 text-2xl text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-700 lg:justify-end'>
              Crea un recordatorio
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CrudReminders
