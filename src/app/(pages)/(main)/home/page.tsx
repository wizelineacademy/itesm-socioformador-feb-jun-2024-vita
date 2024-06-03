'use client'

import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IoIosArrowForward } from 'react-icons/io'
import {
  faAngleRight,
  faLightbulb,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons'
import {
  FaHeart,
  FaComments,
  FaCircle,
  FaAngleRight,
  FaSuitcase,
  FaDumbbell,
  FaPercent,
} from 'react-icons/fa'
import Link from 'next/link'
import axios from 'axios'
import Swal from 'sweetalert2'
import { UserAdmin } from '@/src/data/datatypes/user'
import { HealthData } from '@/src/data/datatypes/healthdata'
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const [isOpen2, setIsOpen2] = useState(true)
  const [userData, setUserData] = useState<HealthData | null>(null)
  const [user, setUser] = useState<UserAdmin[] | null>(null)

  const getData = async () => {
    try {
      const response = await axios.get('/api/healthdata')
      const fetchedData = response.data

      setUserData(fetchedData)
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al recuperar los datos',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  const handleChallengeLink = () => {
    if (user && user[0].type === 'admin') {
      router.push('/home/createChallenge')
    } else {
      router.push('/home/challenge')
    }
  }

  const getDataUser = async () => {
    try {
      const response = await axios.get('/api/membership')
      const fetchedData = response.data
      setUser(fetchedData)
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
    getDataUser()
  }, [])

  const toggleContent = () => {
    setIsOpen(!isOpen)
  }

  // Función para manejar el cambio de estado en pantallas pequeñas
  const handleToggle2 = () => {
    setIsOpen2(!isOpen2)
  }

  // Define an array of suggestions
  const suggestions = [
    '¡Come más frutas y verduras!',
    '¡Sal a dar un paseo!',
    '¡Toma más agua!',
    '¡Hoy practica Mindfullness por 10 minutos!',
    '¡Recuerda dormir 7-8 horas diarias!',
  ]

  // Function to generate a random suggestion
  const generateRandomSuggestion = () => {
    const randomIndex = Math.floor(Math.random() * suggestions.length)
    return suggestions[randomIndex]
  }

  // State to hold the current random suggestion
  const [randomSuggestion, setRandomSuggestion] = useState(
    generateRandomSuggestion(),
  )

  // Function to generate a new random suggestion
  const handleGenerateSuggestion = () => {
    const newRandomSuggestion = generateRandomSuggestion()
    setRandomSuggestion(newRandomSuggestion)
  }

  return (
    <div>
      <div className='mt-4 flex justify-start text-5xl font-bold text-white sm:justify-center sm:px-5 sm:py-4 md:justify-start lg:justify-start'>
        <h1 className='mr-2 w-[800px] pl-2 text-home-title sm:pl-0'>
          Bienvenid@ a
          <span className='ml-4 mr-24 flex flex-row justify-start text-7xl'>
            VITA
            <FaHeart size={60} className='justify-end text-home-title' />
          </span>
        </h1>
      </div>

      <div className='flex flex-col items-center justify-center lg:flex-row'>
        <div id='Izquierda' className='flex flex-col'>
          <div className='mb-4 mt-4 hidden h-[250px] w-[225px] rounded-3xl bg-color-home2 pb-4 md:block'>
            <h2 className='ml-4 mt-4 text-2xl font-bold text-white'>
              Recomendación del Día
            </h2>
            <div className='mx-4 mt-4 flex h-[120px] w-[185px] items-center justify-between rounded-3xl bg-color-home3 px-5'>
              <p className='text-lg text-[#1D154A]'>{randomSuggestion}</p>
              <button
                onClick={handleGenerateSuggestion}
                className='cursor-pointer border-none bg-transparent'
              >
                <FontAwesomeIcon icon={faLightbulb} color='#1D154A' size='lg' />
              </button>
            </div>
          </div>

          <Link
            href='/home/blog'
            id='Preguntame'
            className='justify-left mt-4 flex h-16 w-56 items-center gap-x-5 rounded-full bg-color-home5 px-4 transition-colors duration-300 ease-in-out hover:cursor-pointer hover:bg-color-home6'
          >
            <FaComments size={24} color='white' className='mb-2 ml-4' />
            <span className='text-2xl font-bold text-white'>Blog</span>
          </Link>
          <Link href='/home/medicalprofile'>
            <div
              id='Perfil'
              className='px-4transition-colors mt-4 flex h-16 w-56 items-center justify-between rounded-full bg-color-home5 duration-300 ease-in-out hover:cursor-pointer hover:bg-color-home6'
            >
              <span className='ml-4 text-2xl font-bold text-white'>Perfil</span>
              <FaCircle size={32} color='white' className='mb-2 mr-4' />
            </div>
          </Link>
        </div>

        <div id='Centro' className='flex flex-col'>
          <Link href='/home/generalData'>
            <div
              className={`mx-4 mt-4 w-[190px] rounded-3xl bg-color-home6 transition-colors duration-300 ease-in-out hover:bg-color-home5`}
            >
              <div className='flex flex-col items-center justify-center'>
                <span className='flex flex-row'>
                  <h2 className='ml-4 mt-4 w-[120px] text-2xl font-bold text-white'>
                    Mis datos de salud
                  </h2>
                  <div className='mt-4 lg:hidden'>
                    <button
                      onClick={toggleContent}
                      className='focus:outline-none'
                    >
                      <FontAwesomeIcon
                        icon={isOpen ? faAngleDown : faAngleRight}
                        size='2x'
                        color='white'
                        className='transform transition-transform duration-300'
                      />
                    </button>
                  </div>
                </span>

                <div
                  className={`${!isOpen ? 'block' : 'hidden'} items-center justify-center lg:mt-4 lg:flex lg:flex-col`}
                >
                  <div className='mt-7 w-[150px] rounded-3xl bg-white px-4 py-2'>
                    <div className='flex flex-row justify-between text-home-title'>
                      <FaSuitcase size={30} />
                      <p className='ml-2 flex flex-row text-2xl'>
                        {' '}
                        {userData && userData.weight}{' '}
                        <span className='pl-2'> kg</span>
                      </p>
                    </div>
                  </div>
                  <div className='mt-7 w-[150px] rounded-3xl bg-white px-4 py-2'>
                    <div className='flex flex-row justify-between text-home-title'>
                      <IoIosArrowForward size={30} />
                      <p className='ml-2 flex flex-row text-2xl'>
                        {' '}
                        {userData && userData.height}{' '}
                        <span className='pl-2'> m</span>
                      </p>
                    </div>
                  </div>
                  <div className='mt-7 w-[150px] rounded-3xl bg-white px-4 py-2'>
                    <div className='flex flex-row justify-between text-home-title'>
                      <FaDumbbell size={30} />
                      <p className='ml-2 flex flex-row text-2xl'>
                        {userData && userData.muscularMass}{' '}
                        <span className='pl-2'> kg</span>
                      </p>
                    </div>
                  </div>
                  <div className='mt-7 w-[150px] rounded-3xl bg-white px-4 py-2'>
                    <div className='flex flex-row justify-between text-home-title'>
                      <FaPercent size={30} />
                      <p className='ml-2 flex flex-row text-2xl'>
                        {' '}
                        {userData && userData.bodyFat}{' '}
                        <span className='pl-2'> kg</span>
                      </p>
                    </div>
                  </div>
                  <div className='mt-8 justify-end'></div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div id='Derecha' className='flex flex-col lg:mr-6'>
          <Link
            href='/home/dashboard'
            id='Dashboard'
            className='mt-4 flex h-[120px] w-[232px] flex-row justify-between rounded-3xl bg-color-home7 transition-colors duration-300 ease-in-out hover:cursor-pointer hover:bg-color-home2'
          >
            <h2 className='mt-2 w-[120px] pl-4 text-2xl font-bold text-color-home6'>
              Mi Dashboard de Salud
            </h2>
            <div className='mr-8 mt-4 flex flex-col'>
              <FaAngleRight size={48} color='#144154' />

              <FaCircle color='white' size={32} />
            </div>
          </Link>

          <div className='mt-4 flex flex-col items-center justify-center rounded-3xl bg-color-home7 pb-2'>
            <div className='flex flex-row items-center'>
              <h2 className='mt-2 pl-4 text-2xl font-bold text-color-home6'>
                Autoevaluación
              </h2>
              <span className='lg:hidden'>
                <button
                  className='ml-2 focus:outline-none'
                  onClick={handleToggle2}
                >
                  <FontAwesomeIcon
                    icon={!isOpen2 ? faAngleDown : faAngleRight}
                    size='lg'
                    className='transform transition-transform duration-300'
                  />
                </button>
              </span>
            </div>

            <div
              className={`${!isOpen2 ? 'block' : 'hidden'} items-center justify-center lg:mt-4 lg:flex lg:flex-col`}
            >
              <div className='mt-2 flex w-[190px] flex-row justify-between rounded-2xl bg-white p-1 transition-colors duration-300 ease-in-out hover:cursor-pointer hover:bg-color-home3'>
                <h2 className='pl-2 text-lg font-bold text-color-home6'>
                  Nutrición
                </h2>
                <FaAngleRight size={28} />
              </div>
              <div className='mt-4 flex w-[190px] flex-row justify-between rounded-2xl bg-white p-1 transition-colors duration-300 ease-in-out hover:cursor-pointer hover:bg-color-home3'>
                <h2 className='pl-2 text-lg font-bold text-color-home6'>
                  Ejercicio
                </h2>
                <FaAngleRight size={28} />
              </div>
              <div className='mt-4 flex w-[190px] flex-row justify-between rounded-2xl bg-white p-1 transition-colors duration-300 ease-in-out hover:cursor-pointer hover:bg-color-home3'>
                <h2 className='pl-2 text-lg font-bold text-color-home6'>
                  Sueño
                </h2>
                <FaAngleRight size={28} />
              </div>
            </div>
          </div>

          <button
            id='Challenge'
            className='ml-4 mt-4 flex h-16 w-56 items-center justify-between rounded-full bg-color-home6 px-4 transition-colors duration-300 ease-in-out hover:cursor-pointer hover:bg-color-home5'
            onClick={handleChallengeLink}
          >
            <span className='ml-3 text-lg font-bold text-white'>
              Retos y Logros
            </span>
            <FaAngleRight size={48} color='#fff' className='mb-2 ml-4' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
