import { disability } from '@/src/db/schema/schema'
export interface ProfileData {
  idMedicalProfile: number
  idUser: number
  emergencyName: string | null
  emergencyPhone: string | null
  policyUser: string | null
  insuranceCompany: string | null
  bloodType: string | null
}

export interface EditProfileData {
  idUser: number
  name: string
  email: string
  phoneNumber: string | null
  idMedicalProfile: number
  emergencyName: string | null
  emergencyPhone: string | null
  policyUser: string | null
  insuranceCompany: string | null
  bloodType: string | null
}

export interface AllergiesData {
  name: string
  reaction: string
}

export interface GetAllergiesData {
  length: number
  map(
    arg0: (allergy: any, index: any) => import('react').JSX.Element,
  ): import('react').ReactNode
  name: string
  reaction: string
  idMedicalProfile: number
  idAllergies: number
}

export interface EditAllergiesData {
  idAllergies: number
  name: string
  reaction: string
}

export interface DisabilityData {
  name: string
}

export interface GetDisabilityData {
  length: number
  map(
    arg0: (disability: any, index: any) => import('react').JSX.Element,
  ): import('react').ReactNode
  name: string
  idMedicalProfile: number
  idDisability: number
}

export interface EditDisabilityData {
  idDisability: number
  name: string
}

export interface ChronicalData {
  name: string
}

export interface GetChronicalData {
  length: number
  map(
    arg0: (chronical: any, index: any) => import('react').JSX.Element,
  ): import('react').ReactNode
  name: string
  idMedicalProfile: number
  idChronicalDesease: number
}

export interface EditChronicalData {
  idChronicalDesease: number
  name: string
}

export interface MedicinesData {
  name: string
  routeAdmin: string
  dose: string
  duration: string
}

export interface GetMedicinesData {
  length: number
  map(
    arg0: (medicine: any, index: any) => import('react').JSX.Element,
  ): import('react').ReactNode
  name: string
  idMedicalProfile: number
  idMedicines: number
  routeAdmin: string
  dose: string
  duration: string
}

export interface EditMedicinesData {
  idMedicines: number
  name: string
  routeAdmin: string
  dose: string
  duration: string
}
