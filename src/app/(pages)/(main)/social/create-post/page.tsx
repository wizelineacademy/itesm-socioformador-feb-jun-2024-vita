'use client'
import { AddPhotoAlternateOutlined } from '@mui/icons-material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import React from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

const CreatePost = () => {
  const postData = {
    creatorId: '',
    caption: '',
    tag: '',
    postPhoto: null as FileList | null,
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: postData,
  })

  const router = useRouter()

  const handlePublish: SubmitHandler<FieldValues> = async (data) => {
    try {
      const postForm = new FormData()
      postForm.append('creatorId', data.creatorId)
      postForm.append('caption', data.caption)
      postForm.append('tag', data.tag)

      if (data.postPhoto && data.postPhoto.length > 0) {
        postForm.append('postPhoto', data.postPhoto[0])
      }

      await axios.post('/api/post/new', postForm)

      Swal.fire({
        title: 'Éxito',
        text: 'Se ha creado una publicación',
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

  const postPhoto = watch('postPhoto')

  return (
    <>
      <div className='pt-6'>
        <form
          className='flex flex-col gap-7 pb-24'
          onSubmit={handleSubmit(handlePublish)}
        >
          <label
            htmlFor='photo'
            className='flex cursor-pointer items-center gap-4 text-light-1'
          >
            {postPhoto ? (
              typeof postPhoto === 'string' ? (
                <Image
                  src={postPhoto || 'assets/default-image.jpg'}
                  alt='post'
                  width={250}
                  height={200}
                  className='rounded-lg object-cover'
                />
              ) : (
                postPhoto.length > 0 && (
                  <Image
                    src={URL.createObjectURL(postPhoto[0] as File)}
                    alt='post'
                    width={250}
                    height={200}
                    className='rounded-lg object-cover'
                  />
                )
              )
            ) : (
              <AddPhotoAlternateOutlined
                sx={{ fontSize: '100px', color: 'white' }}
              />
            )}
            <p> Agregar una Foto </p>
          </label>
          <input
            {...register('postPhoto', {
              validate: (value: FileList | null) => {
                if (!value || value.length === 0) {
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
            Publicar
          </button>
        </form>
      </div>
    </>
  )
}

export default CreatePost
