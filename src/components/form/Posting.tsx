// components/form/Posting.tsx

import React from 'react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { AddPhotoAlternateOutlined } from '@mui/icons-material'
import Image from 'next/image'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface PostingProps {
  post: {
    caption: string
    tag: string
    postPhoto: string
  }
  apiEndpoint: string
}

const Posting: React.FC<PostingProps> = ({ post, apiEndpoint }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: post,
  })

  const router = useRouter()

  const handlePublish: SubmitHandler<FieldValues> = async (data) => {
    try {
      const postForm = new FormData()
      postForm.append('creatorId', data.creatorId)
      postForm.append('caption', data.caption)
      postForm.append('tag', data.tag)

      if (data.postPhoto && data.postPhoto[0]) {
        postForm.append('postPhoto', data.postPhoto[0])
      }

      // Añadir el indicador de si la imagen se ha editado o no
      postForm.append('imageEdited', String(watch('postPhoto') ? true : false))

      await axios.put(apiEndpoint, postForm)

      Swal.fire({
        title: 'Éxito',
        text: 'Se han guardado las datos con éxito',
        icon: 'success',
        confirmButtonText: 'OK',
      })
      router.push('/social')
      router.refresh()
    } catch (err) {
      console.log(err)
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al guardar los datos',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  return (
    <div className='pt-6'>
      <form
        className='flex flex-col gap-7 pb-24'
        onSubmit={handleSubmit(handlePublish)}
      >
        <label
          htmlFor='photo'
          className='flex cursor-pointer items-center gap-4 text-light-1'
        >
          {watch('postPhoto') ? (
            typeof watch('postPhoto') === 'string' ? (
              <Image
                src={watch('postPhoto') || 'assets/default-image.jpg'}
                alt='post'
                width={250}
                height={200}
                className='rounded-lg object-cover'
              />
            ) : (
              <Image
                src={URL.createObjectURL(watch('postPhoto')[0])}
                alt='post'
                width={250}
                height={200}
                className='rounded-lg object-cover'
              />
            )
          ) : (
            <AddPhotoAlternateOutlined
              sx={{ fontSize: '100px', color: 'white' }}
            />
          )}
          <p> Cambiar de Foto </p>
        </label>
        <input
          {...register('postPhoto', {
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
        {errors.postPhoto && (
          <p className='text-red-500'>{errors.postPhoto.message}</p>
        )}

        <div>
          <label htmlFor='caption' className='text-light-1'>
            Tema
          </label>
          <textarea
            {...register('caption', {
              required: 'El tema es requerido',
              validate: (value) => {
                if (value.length < 3) {
                  return 'El tema debe tener al menos 3 caracteres'
                }
              },
            })}
            rows={3}
            placeholder='¿Qué piensas?'
            className='mt-3 w-full rounded-lg border-none bg-dark-1 p-2.5 text-light-1 focus:outline-none'
            id='caption'
          />
          {errors.caption && (
            <p className='text-red-500'>{errors.caption.message}</p>
          )}
        </div>

        <div>
          <label htmlFor='tag' className='text-light-1'>
            Tag
          </label>
          <input
            {...register('tag', { required: 'Etiqueta es requerida' })}
            type='text'
            placeholder='#etiqueta'
            className='mt-3 w-full rounded-lg border-none bg-dark-1 p-2.5 text-light-1 focus:outline-none'
          />
          {errors.tag && <p className='text-red-500'>{errors.tag.message}</p>}
        </div>

        <button
          type='submit'
          className='mt-10 rounded-lg bg-purple-1 py-2.5 text-light-1 hover:bg-pink-1'
        >
          Editar
        </button>
      </form>
    </div>
  )
}

export default Posting
