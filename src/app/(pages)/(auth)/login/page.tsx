'use client'
import { signIn } from 'next-auth/react'
import React from 'react'
import Information from '@/src/components/information/Information'
import Button from '@/src/components/buttons/Button'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from '@/src/components/Inputs/Input'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/src/validations/LoginSchema'
import Swal from 'sweetalert2'

/**
 * @description Pantalla de registro
 * @author Bernardo de la Sierra
 * @version 1.0.1
 * @returns {JSX.Element} Retorna un elemento JSX que representa el botón.
 */
const Login = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { email, password } = data

    try {
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (!response?.ok) {
        const error = JSON.parse(
          response?.error ??
            '{errors: "Ocurrió un error durante el inicio de sesión"}',
        )
        throw new Error(error.errors)
      }
      // Process response here
      Swal.fire({
        title: 'Se ha iniciado sesión',
        text: 'Se realizó el inicio de sesión con éxito',
        icon: 'success',
        confirmButtonText: 'OK',
      })

      if (!response?.error) {
        router.push('/home')
        router.refresh()
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
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
          <span>
            <Information />
          </span>
        </div>

        <form
          id='SignUp-Section'
          className='mt-4 flex flex-col items-center md:px-10 lg:mt-0'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className='mx-auto mb-16 pt-2 text-3xl font-bold text-white md:w-[400px] md:text-4xl lg:w-[400px] lg:text-4xl'>
            ¡Bienvenid@ de nuevo!
          </h2>
          <div className='pb-4'>
            <Input
              id='email'
              label='Correo electrónico'
              type='email'
              register={register}
              errors={errors}
              required
            />
          </div>

          {errors.email && typeof errors.email.message === 'string' && (
            <span className='mb-5 text-custom-red'>{errors.email.message}</span>
          )}

          <div className='pb-4'>
            <Input
              id='password'
              label='Contraseña'
              type='password'
              register={register}
              errors={errors}
              required
            />
          </div>

          {errors.password && typeof errors.password.message === 'string' && (
            <span className='mb-5 text-custom-red'>
              {errors.password.message}
            </span>
          )}

          <div className='pb-4'>
            <Button
              outline
              label='Continuar con  Google'
              icon={FcGoogle}
              onClick={() =>
                signIn('google', {
                  callbackUrl: '/home',
                })
              }
            />
          </div>
          <div className='pb-8'>
            <Button
              outline
              label='Continuar con Facebook'
              icon={FaFacebook}
              onClick={() =>
                signIn('facebook', {
                  callbackUrl: '/home',
                })
              }
            />
          </div>

          <Button
            type='submit'
            borderColor='border-custom-green'
            label='Iniciar sesión'
            outline
            big
          />

          <h3 className='pt-4 text-sm font-bold leading-normal text-white lg:text-lg'>
            ¿No tienes una cuenta?
            <span className='cursor-pointer pl-4 hover:underline'>
              <Link href='/signup'>Regístrate</Link>
            </span>
          </h3>
        </form>
      </div>
    </div>
  )
}

export default Login
