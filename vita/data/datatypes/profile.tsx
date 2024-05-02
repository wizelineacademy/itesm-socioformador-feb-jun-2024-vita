import { disability } from '@/db/schema/schema';
export interface ProfileData {
    idMedicalProfile: number;
    idUser: number;
    emergencyName: string | null;
    emergencyPhone: string | null;
    policyUser: string | null;
    insuranceCompany: string | null;
    bloodType: string | null;
  }

  export interface EditProfileData {
    idUser: number;
    name: string;
    email: string;
    phoneNumber:  string | null;  
    idMedicalProfile: number;
    emergencyName: string | null;
    emergencyPhone: string | null;
    policyUser: string | null;
    insuranceCompany: string | null;
    bloodType: string | null;
  }
  
  export interface AllergiesData {
    name: string;
    reaction: string;
  }
  
export interface GetAllergiesData {
  length: number;
  map(arg0: (allergy: any, index: any) => import("react").JSX.Element): import("react").ReactNode;
  name: string;
  reaction: string;
  idMedicalProfile: Number;
  idAllergies: Number;
}

export interface EditAllergiesData {
  idAllergies: Number;
  name: string;
  reaction: string;
}


export interface DisabilityData {
  name: string;
}

export interface GetDisabilityData {
  length: number;
map(arg0: (disability: any, index: any) => import("react").JSX.Element): import("react").ReactNode;
name: string;
idMedicalProfile: Number;
idDisability: Number;
}

export interface EditDisabilityData {
  idDisability: Number;
  name: string;
}


export interface ChronicalData {
  name: string;
}

export interface GetChronicalData {
  length: number;
map(arg0: (chronical: any, index: any) => import("react").JSX.Element): import("react").ReactNode;
name: string;
idMedicalProfile: Number;
idChronicalDesease: Number;
}

export interface EditChronicalData {
  idChronicalDesease: Number;
  name: string;
}

export interface MedicinesData {
  name: string;
  routeAdmin: string;
  dose: string;
  duration: string;
}

export interface GetMedicinesData {
  length: number;
  map(arg0: (medicine: any, index: any) => import("react").JSX.Element): import("react").ReactNode;
  name: string;
  idMedicalProfile: Number;
  idMedicines: Number;
  routeAdmin: string;
  dose: string;
  duration: string;
  }
  
  export interface EditMedicinesData {
    idMedicines: Number;
    name: string;
    routeAdmin: string;
    dose: string;
    duration: string;
  }