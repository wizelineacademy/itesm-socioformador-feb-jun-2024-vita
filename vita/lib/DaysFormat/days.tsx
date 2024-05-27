//Convert JS date to string timestamp
export const formatDays = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
 
  return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
};

//conver JS date to string timestamp
export const formatDaysUTC = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  let month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  let day = date.getUTCDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// Función para calcular días
export const calculateDays = (frequencyInSeconds: number): number => {
return Math.floor(frequencyInSeconds / (24 * 3600));
};

// Función para calcular horas
export const calculateHours = (frequencyInSeconds: number): number => {
return Math.floor((frequencyInSeconds % (24 * 3600)) / 3600);
};

export  const calculateHoursTime = (dateTimeString: string | null): string | null => {
if (!dateTimeString) return null;
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const addSecondsToDate = (date: Date | null, seconds: number) => {
  const milliseconds = seconds * 1000;

  if(!date){
    return new Date(milliseconds)
  }

  const currentMilliseconds = date.getTime();
  const newMilliseconds = currentMilliseconds + milliseconds;
  return new Date(newMilliseconds);
}

export const getMonthName = (): string => {
  const currentDate = new Date();
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  return monthNames[currentDate.getMonth()];
};