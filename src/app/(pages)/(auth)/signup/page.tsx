'use client'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/src/components/buttons/Button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { RegisterSchema } from '@/src/validations/RegisterSchema'
import Information from '@/src/components/information/Information'
import Input from '@/src/components/Inputs/Input'
import { signIn } from 'next-auth/react'

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const swal = require('sweetalert2')

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getServerSession()
        if (session) {
          redirect('/home')
        }
      } catch (error) {
        console.error('Error fetching session', error)
      }
    }

    checkSession()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(RegisterSchema), // Usa zodResolver con el esquema RegisterSchema
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios
      .post('/api/auth/register', data)
      .then(() => {
        swal.fire({
          title: 'Se ha registrado',
          text: 'El registro ha sido exitoso.',
          icon: 'success',
          confirmButtonText: 'OK',
        })

        signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        })
      })
      .then((res) => {
        router.push('/healthdata')
      })
      .catch((error) => {
        const errorMessage =
          error.response.status === 401
            ? 'El correo ya se encuentra registrado.'
            : 'Ha ocurrido un error durante el registro.'

        swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div
      id='Background'
      className='flex min-h-screen flex-col bg-gradient-custom'
    >
      <div
        id='Section'
        className='flex flex-1 flex-col items-center justify-center md:flex-row lg:flex-row'
      >
        <div
          id='Section-Information'
          className='lg:w-3/8 flex flex-col items-center sm:items-center md:items-start md:px-10 lg:items-start lg:px-20'
        >
          <h2 className='w-[300px] pt-2 text-3xl font-bold text-white sm:w-[300px] md:w-[300px] lg:w-[300px] lg:text-4xl'>
            ¡No lo dudes más y haz tu cuenta ahora mismo!
          </h2>
          <span>
            <Information />
          </span>
        </div>

        <form
          id='SignUp-Section'
          className='mt-4 flex flex-col items-center md:px-10 lg:mt-0'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='pb-4'>
            <Input
              id='name'
              label='Nombre'
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              big
            />
          </div>

          {errors.name && typeof errors.name.message === 'string' && (
            <span className='mb-2 text-custom-red'>{errors.name.message}</span>
          )}

          <div className='pb-4'>
            <Input
              id='email'
              label='Correo'
              type='email'
              disabled={isLoading}
              register={register}
              errors={errors}
              big
              required
            />
          </div>

          {errors.email && typeof errors.email.message === 'string' && (
            <span className='mb-2 text-custom-red'>{errors.email.message}</span>
          )}

          <div className='flex-row sm:md:lg:flex'>
            <div className='pb-4 md:lg:mr-4'>
              <Input
                id='password'
                label='Contraseña'
                type='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
            </div>

            <div className='pb-4'>
              <Input
                id='confirmPassword'
                label='Confirmar contraseña'
                type='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
            </div>
          </div>

          {errors.password && typeof errors.password.message === 'string' && (
            <span className='mb-2 text-custom-red'>
              {errors.password.message}
            </span>
          )}

          <div className='flex-row md:lg:flex'>
            <div className='pb-4 pt-8 md:lg:mr-4'>
              <Button
                outline
                label='Continuar con Google'
                icon={FcGoogle}
                onClick={() =>
                  signIn('google', {
                    callbackUrl: '/healthdata',
                  })
                }
              />
            </div>
            <div className='pb-8 lg:pt-8'>
              <Button
                outline
                label='Continuar con Facebook'
                icon={FaFacebook}
                onClick={() =>
                  signIn('facebook', {
                    callbackUrl: '/healthdata',
                  })
                }
              />
            </div>
          </div>

          <Button
            type='submit'
            borderColor='border-custom-green'
            label='Regístrate'
            outline
            big
          />

          <h3 className='pt-4 text-sm font-bold leading-normal text-white lg:text-lg'>
            ¿Ya tienes una cuenta?
            <span className='cursor-pointer pl-4 hover:underline'>
              <Link href='/login'>Iniciar Sesión</Link>
            </span>
          </h3>
        </form>
      </div>
    </div>
  )
}

export default SignUp
