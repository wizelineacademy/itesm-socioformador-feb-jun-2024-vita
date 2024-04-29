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
  