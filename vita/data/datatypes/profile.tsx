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
map(arg0: (disability: any, index: any) => import("react").JSX.Element): import("react").ReactNode;
name: string;
idMedicalProfile: Number;
idDisability: Number;
}

export interface EditDisabilityData {
  idDisability: Number;
  name: string;
}