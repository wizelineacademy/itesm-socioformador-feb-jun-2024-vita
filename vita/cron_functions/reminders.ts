import axios from "axios";

export async function handler() {
    try {
        const res = await axios.post(`https://d8vd0r6uuds8z.cloudfront.net/api/reminders/whatsapp`, {});
        console.log("Recordatorios enviados con éxito")
    } catch(error){
        console.log(error);
    }
}