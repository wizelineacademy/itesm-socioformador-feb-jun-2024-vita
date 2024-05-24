export const formatDate = (date:Date):string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`
}

export const getTodayDate = ():string => {
    const currentDate = new Date();
    return formatDate(currentDate)
}

export const getYesterdayDate = ():string => {
    const currentDate = new Date();
    const yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(currentDate.getDate() - 1);
    return formatDate(yesterdayDate);
}

export const generateDate = (day:string, time:string):Date => {
    const dateTime = `${day}T${time}`
    const date = new Date(dateTime);
    return date;
}

export const getDifferenceInHours = (date1:Date, date2:Date) => {
    const time1 = date1.getTime();
    const time2 = date2.getTime();

    const diffInMilliseconds = time2 - time1;
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    return diffInHours;
}