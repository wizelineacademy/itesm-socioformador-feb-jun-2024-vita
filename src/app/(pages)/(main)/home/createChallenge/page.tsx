'use client'

import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

const CreateChallenge = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [month, setMonth] = useState<number | string>('')
  const [year, setYear] = useState<number | string>(new Date().getFullYear())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await axios.post('/api/challenges', {
        name,
        description,
        month: parseInt(month as string, 10),
        year: parseInt(year as string, 10),
      })

      Swal.fire({
        title: 'Éxito',
        text: 'Reto creado exitosamente',
        icon: 'success',
        confirmButtonText: 'OK',
      })
      router.push('/home/')
      router.refresh()
    } catch (error) {
      // Aquí se especifica el tipo de la variable 'error'
      if (error.response && error.response.status === 409) {
        // Si el servidor devuelve un código de estado 409 (Conflict), significa que ya existe un reto para el mes y año seleccionados
        Swal.fire({
          title: 'Error',
          text: `Ya existe un reto para el mes ${getMonthName(parseInt(month as string, 10))} del año ${year}`,
          icon: 'error',
          confirmButtonText: 'OK',
        })
      } else {
        // Para otros errores, muestra un mensaje de error genérico
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al crear el reto',
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    }
  }

  // Función para obtener el nombre del mes
  const getMonthName = (month: number): string => {
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ]
    return monthNames[month - 1]
  }

  return (
    <div className='flex flex-col justify-center px-5 py-4 text-4xl font-bold md:justify-start lg:justify-start'>
      <span className='flex flex-row'>
        <h1 className='mr-2 text-home-title'>Crear Reto Mensual</h1>
      </span>
      <form onSubmit={handleSubmit} className='mt-6'>
        <div className='mt-4 flex flex-col'>
          <label htmlFor='name' className='mb-6 text-3xl font-bold text-black'>
            Nombre del reto
          </label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full rounded-full bg-input-home px-6 py-2 text-2xl md:w-3/4'
            required
          />
        </div>
        <div className='mt-4 flex flex-col'>
          <label
            htmlFor='description'
            className='mb-6 text-3xl font-bold text-black'
          >
            Descripción
          </label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='h-[100px] w-full resize-none rounded-2xl bg-input-home px-6 py-2 text-2xl md:w-3/4'
            required
          />
        </div>
        <div className='mt-4 flex flex-col'>
          <label htmlFor='month' className='mb-6 text-3xl font-bold text-black'>
            Mes
          </label>
          <select
            id='month'
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className='w-full rounded-full bg-input-home px-6 py-2 text-2xl md:w-3/4'
            required
          >
            <option value=''>Seleccione un mes</option>
            <option value='1'>Enero</option>
            <option value='2'>Febrero</option>
            <option value='3'>Marzo</option>
            <option value='4'>Abril</option>
            <option value='5'>Mayo</option>
            <option value='6'>Junio</option>
            <option value='7'>Julio</option>
            <option value='8'>Agosto</option>
            <option value='9'>Septiembre</option>
            <option value='10'>Octubre</option>
            <option value='11'>Noviembre</option>
            <option value='12'>Diciembre</option>
          </select>
        </div>
        <div className='mt-4 flex flex-col'>
          <label htmlFor='year' className='mb-6 text-3xl font-bold text-black'>
            Año
          </label>
          <input
            type='number'
            id='year'
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className='w-full rounded-full bg-input-home px-6 py-2 text-2xl md:w-3/4'
            min='2024'
            required
          />
        </div>
        <div className='mb-6 ml-2 mt-4 flex lg:items-start lg:justify-start'>
          <button
            type='submit'
            className='mt-2 w-80 rounded-full bg-button-home px-3 py-2 text-2xl text-white'
          >
            Crear Reto
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateChallenge
