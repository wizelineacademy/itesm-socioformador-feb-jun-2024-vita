'use client'
import { AddPhotoAlternateOutlined } from '@mui/icons-material'
import Image from 'next/image'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import React from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const ChallengeForm = () => {
  const router = useRouter()

  const postData: {
    description: string
    imageUrl: string | File[] | null
  } = {
    description: '',
    imageUrl: null,
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: postData,
  })

  const handlePublish: SubmitHandler<FieldValues> = async (data) => {
    try {
      const challengeForm = new FormData()
      challengeForm.append('description', data.description)

      if (data.imageUrl && data.imageUrl[0]) {
        challengeForm.append('imageUrl', data.imageUrl[0])
      }
      await axios.post('/api/monthlyChallenge', challengeForm)

      router.refresh()
      router.push('/home/challenge')

      Swal.fire({
        title: 'Éxito',
        text: 'Se ha subido la respuesta con éxito acuerdate de evaluar 5 compañeros más para ganar más puntos',
        icon: 'success',
        confirmButtonText: 'OK',
      })
    } catch (err) {
      console.log(err)
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al subir la respuesta',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  return (
    <form
      className='flex flex-col gap-7 pb-24'
      onSubmit={handleSubmit(handlePublish)}
    >
      <label
        htmlFor='photo'
        className='flex cursor-pointer items-center gap-4 text-black'
      >
        {watch('imageUrl') ? (
          typeof watch('imageUrl') === 'string' ? (
            <Image
              src={(watch('imageUrl') as string) || 'assets/default-image.jpg'}
              alt='post'
              width={250}
              height={200}
              className='rounded-lg object-cover'
            />
          ) : (
            <Image
              src={URL.createObjectURL((watch('imageUrl') as File[])[0])}
              alt='post'
              width={250}
              height={200}
              className='rounded-lg object-cover'
            />
          )
        ) : (
          <AddPhotoAlternateOutlined
            sx={{ fontSize: '100px', color: 'blue' }}
          />
        )}
        <p>Agregar una Foto</p>
      </label>
      <input
        {...register('imageUrl', {
          validate: (value) => {
            if (
              !value ||
              (Array.isArray(value) && value.length === 0) ||
              value === undefined
            ) {
              return 'La fotografía es requerida!'
            }
            return true
          },
        })}
        id='photo'
        type='file'
        style={{ display: 'none' }}
      />

      {errors.imageUrl && (
        <p className='text-red-500'>{errors.imageUrl.message}</p>
      )}

      <div>
        <label htmlFor='description' className='text-black'>
          Descripción
        </label>
        <textarea
          {...register('description', {
            required: 'La descripción es requerida',
            validate: (value) => {
              if (value.length < 3) {
                return 'La descripción debe tener al menos 3 caracteres'
              }
            },
          })}
          rows={3}
          placeholder='¿Qué piensas?'
          className='mt-3 w-full resize-none rounded-lg border-none bg-input-home p-2.5 text-2xl text-black focus:outline-none'
          id='description'
        />
        {errors.description && (
          <p className='text-red-500'>{errors.description.message}</p>
        )}
      </div>

      <div className='mb-6 ml-2 flex lg:items-center lg:justify-center'>
        <button
          type='submit'
          className='mt-2 w-60 rounded-full bg-button-home py-2 text-2xl text-white'
        >
          Subir Reto
        </button>
      </div>
    </form>
  )
}

export default ChallengeForm
