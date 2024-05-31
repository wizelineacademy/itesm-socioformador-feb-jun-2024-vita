export interface ReminderData {
    idReminders: number;
    idUser: number;
    name: string;
    frequency: number;
    startTime: string;
    endTime: string | null; 
    description: string;
    frequencyDays: number; 
    frequencyHours: number; 
    startDays: string;
    startHours: string;
    endDays: string | null; 
    endHours: string | null; 
  }

export  interface EditReminderData {
    idReminders: number;
    idUser: number;
    name: string;
    frequency: number;
    startTime: string;
    endTime: string | null; 
    description: string;
    frequencyDays: number; 
    frequencyHours: number; 
    startDays: string; 
    startHours: string;
    endDays: string | null; 
    endHours: string | null; 
  }