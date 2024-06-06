'use client'
import Swal from 'sweetalert2'
import React, { useEffect, useState } from 'react'
import Button from '@/src/components/buttons/Button'
import axios from 'axios'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Select from '@/src/components/Inputs/Select'
import Input from '@/src/components/Inputs/Input'
import { useRouter } from 'next/navigation'
import { HealthSchema } from '@/src/validations/HealthSchema'
import { zodResolver } from '@hookform/resolvers/zod'

/**
 * @description Pantalla de registro
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @returns {JSX.Element} Retorna un elemento JSX que representa el botón.
 */
const HealthData = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(HealthSchema),
    defaultValues: {
      sex: '',
      weight: '',
      height: '',
      bodyFat: '',
      muscularMass: '',
      birthDate: '',
      phoneNumber: '',
    },
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/api/healthdata')
        const data = response.data
        console.log(data)
        if (!data) {
          return
        } else {
          router.replace('/home')
        }
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    try {
      await axios.post('/api/healthdata', data)

      Swal.fire({
        title: 'Éxito',
        text: 'Se han guardado los datos con éxito',
        icon: 'success',
        confirmButtonText: 'OK',
      })
      router.push('/plan')
      router.refresh()
    } catch (error) {
      console.error(error)
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al guardar los datos',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      id='Background'
      className='flex min-h-screen flex-col bg-gradient-custom'
    >
      <div
        id='Section'
        className='flex flex-1 flex-col items-center justify-center gap-10 md:flex-row lg:flex-row'
      >
        <div
          id='Health-Section'
          className='mt-4 flex flex-col items-center md:px-10 lg:mt-0'
        >
          <h2 className='mb-16 w-[300px] pt-2 text-4xl font-bold text-white md:lg:w-[500px]'>
            Ingresa tus datos de salud
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex-row md:lg:flex'>
              <div className='pb-8 md:lg:mr-8'>
                <Input
                  id='weight'
                  label='Peso(kg)* '
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
              </div>

              <div className='pb-8'>
                <Input
                  id='height'
                  label='Altura(m)*'
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
              </div>
            </div>

            {errors.weight && typeof errors.weight.message === 'string' && (
              <span className='mb-5 block text-custom-red'>
                {errors.weight.message}
              </span>
            )}
            {errors.height && typeof errors.height.message === 'string' && (
              <span className='mb-5 block text-custom-red'>
                {errors.height.message}
              </span>
            )}

            <div className='flex-row sm:md:lg:flex'>
              <div className='pb-8 md:lg:mr-8'>
                <Select
                  id='sex'
                  label='Sexo*'
                  options={[
                    { value: 'M', label: 'Masculino' },
                    { value: 'F', label: 'Femenino' },
                  ]}
                  register={register}
                  errors={errors}
                />
              </div>

              <div className='pb-8'>
                <Input
                  id='birthDate'
                  label='Fecha de nacimiento*'
                  type='date'
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
              </div>
            </div>

            {errors.sex && typeof errors.sex.message === 'string' && (
              <span className='mb-5 block text-custom-red'>
                {errors.sex.message}
              </span>
            )}

            {errors.birthDate &&
              typeof errors.birthDate.message === 'string' && (
                <span className='mb-5 block text-custom-red'>
                  {errors.birthDate.message}
                </span>
              )}

            <div className='flex-row md:lg:flex'>
              <div className='pb-8 md:lg:mr-8'>
                <Input
                  id='bodyFat'
                  label='Grasa corporal(%)'
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                />
              </div>

              <div className='pb-8'>
                <Input
                  id='muscularMass'
                  label='Masa muscular(kg)'
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                />
              </div>
            </div>

            <div className='pb-4'>
              <Input
                id='phoneNumber'
                label='Teléfono*'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                big
              />
            </div>

            {errors.phoneNumber &&
              typeof errors.phoneNumber.message === 'string' && (
                <span className='mb-5 block text-custom-red'>
                  {errors.phoneNumber.message}
                </span>
              )}

            <div className='m-auto flex flex-col items-center justify-center'>
              <h3 className='pb-4 pt-2 text-xs font-bold leading-normal text-custom-red lg:text-lg'>
                * campo requerido
              </h3>

              <Button
                borderColor='border-custom-red'
                label='Continuar'
                outline
                big
                onClick={() => {}}
                type='submit'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default HealthData
