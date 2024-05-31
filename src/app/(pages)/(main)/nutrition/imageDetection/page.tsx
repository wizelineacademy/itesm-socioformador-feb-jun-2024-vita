'use client'
import { useState } from 'react'
import { NutritionalInfo } from '@/src/data/datatypes/nutritionalInfo'
import axios from 'axios'
import Image from 'next/image'

function FoodAnalysisPage() {
  const [nutritionalInfos, setNutritionalInfos] = useState<
    NutritionalInfo[] | null
  >(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false) // Nuevo estado para indicar carga

  //convert file to data readable by GEMINI
  const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result
        if (typeof result === 'string') {
          resolve(result.split(',')[1])
        } else {
          resolve('')
        }
      }
      reader.readAsDataURL(file)
    })

    return {
      inlineData: {
        data: await base64EncodedDataPromise,
        mimeType: file.type,
      },
    }
  }

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    const imageUrl = URL.createObjectURL(file)
    setImageUrl(imageUrl)
    setLoading(true) // Establecer el estado de carga a true

    const imagePart = await fileToGenerativePart(file)

    const res = await axios.post('/api/image_detection', { imagePart })
    const data: NutritionalInfo[] = res.data

    //add record
    const totalCalories = data.reduce((acc, curr) => acc + curr.calories, 0)
    const usageRecords = [
      {
        name: 'image_detection',
        detail: `Calorías detectadas ${totalCalories}`,
      },
    ]
    await axios.post('/api/feature_usage', { usageRecords })

    setNutritionalInfos(res.data)
    setLoading(false) // Establecer el estado de carga a false cuando se completa la carga del modelo
  }

  const renderNutritionalInfo = () => {
    if (!nutritionalInfos) return null

    // Calcular el total de calorías
    const totalCalories = nutritionalInfos.reduce(
      (acc, curr) => acc + curr.calories,
      0,
    )

    return (
      <div>
        {totalCalories !== 0 && (
          <p className='mt-4 text-xl font-bold text-white'>
            Total de calorías: {totalCalories} aproximadas
          </p>
        )}
        <div className='mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:w-3/4 lg:grid-cols-3'>
          {nutritionalInfos.map((nutritionalInfo, index) =>
            nutritionalInfo.name === 'Invalido' ||
            nutritionalInfo.name === 'Inválido' ? (
              <p key={index} className='text-3xl font-bold text-white'>
                Imagen Inválida
              </p>
            ) : (
              <div
                key={index}
                className='overflow-hidden rounded-lg bg-decoration-nutrition-colordark shadow-md'
              >
                <div className='p-6'>
                  <h2 className='mb-2 text-xl font-semibold text-white'>
                    {nutritionalInfo.name}
                  </h2>
                  <div className='grid grid-cols-2 gap-1'>
                    <p className='text-md text-white'>
                      <span className='font-semibold'>Calorías:</span>{' '}
                      {nutritionalInfo.calories}
                    </p>
                    <p className='text-md text-white'>
                      <span className='font-semibold'>Lípidos:</span>{' '}
                      {nutritionalInfo.lipids}
                    </p>
                    <p className='text-md text-white'>
                      <span className='font-semibold'>Proteínas:</span>{' '}
                      {nutritionalInfo.proteins}
                    </p>
                    <p className='text-md text-white'>
                      <span className='font-semibold'>Carbohidratos:</span>{' '}
                      {nutritionalInfo.carbohydrates}
                    </p>
                    <p className='text-md col-span-2 text-white'>
                      <span className='font-semibold'>Subgrupos:</span>{' '}
                      {nutritionalInfo.subgroups.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    )
  }

  return (
    <div className='container p-4'>
      <h1 className='mb-4 text-start text-2xl font-bold text-white'>
        Conteo Calórico{' '}
      </h1>
      <div className='mb-4 flex justify-start'>
        <input
          type='file'
          onChange={handleImageUpload}
          className='cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white'
        />
      </div>
      {loading && <p className='text-4xl font-bold text-white'>Cargando...</p>}
      {imageUrl && (
        <div className='mt-4'>
          <Image
            src={imageUrl}
            alt='Uploaded'
            className='h-auto max-w-full sm:h-[300px] sm:w-[500px]'
          />
        </div>
      )}
      {renderNutritionalInfo()}
    </div>
  )
}

export default FoodAnalysisPage
