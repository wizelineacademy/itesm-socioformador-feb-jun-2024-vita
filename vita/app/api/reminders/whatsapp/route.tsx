import { db } from "@/db/drizzle";
import { Reminders, user } from "@/db/schema/schema";
import { addSecondsToDate } from "@/lib/DaysFormat/days";
import config from "@/lib/environment/config";
import axios from "axios";
import { and, eq, inArray, isNotNull, lte } from "drizzle-orm";
import { NextResponse } from "next/server";

//get reminders that are overdue for the current time
async function getOverdueReminders(){

    const currentDate = new Date()

    const res = await db.select({
        idReminder: Reminders.idReminders,
        title: Reminders.name,
        text: Reminders.description,
        dueTime: Reminders.dueTime,
        endTime: Reminders.endTime,
        frequency: Reminders.frequency,
        phoneNumber: user.phoneNumber
    })
    .from(Reminders)
    .innerJoin(user, eq(user.idUser, Reminders.idUser))
    .where(
        and(
            isNotNull(Reminders.dueTime),
            lte(Reminders.dueTime, currentDate)
        )
    )

    return res;
}

//update the due time of the reminders based on the frequency
async function updateDueTimeReminders(idsReminders: number[]){

    //Fetch the reminders that need to be updated
    const remindersToUpdate = await db
      .select()
      .from(Reminders)
      .where(inArray(Reminders.idReminders, idsReminders))

    // Update the dueTime
    const updatedReminders = remindersToUpdate.map(reminder => {
        let newDueTime: Date | null = addSecondsToDate(reminder.dueTime, reminder.frequency);
        //if the next due time is past the end time, set it to null since the message will stop being sent
        newDueTime = reminder.endTime && newDueTime > reminder.endTime ? null : newDueTime 
        return {
            ...reminder,
            dueTime: newDueTime,
        };
    });

    // Send the updated values back to db
    const updatePromises = updatedReminders.map(reminder =>
      db
        .update(Reminders)
        .set({
          dueTime: reminder.dueTime,
        })
        .where(eq(Reminders.idReminders, reminder.idReminders))
        .execute()
    );

    const updateResults = await Promise.all(updatePromises);

    return updateResults;
}

export async function POST(request: Request) {

    try {

        const reminders = await getOverdueReminders()

        if(reminders.length === 0){
            return NextResponse.json("No messages in queue", { status: 200 });
        }

        const promises = reminders.map(reminder => 
            axios.post(
              `https://graph.facebook.com/v18.0/248211301718489/messages`,
              {
                messaging_product: "whatsapp",
                to: "52" + reminder.phoneNumber,
                text: { body: `Recordatorio: ${reminder.title}\n${reminder.text}`}
              },
              {
                headers: {
                  Authorization: `Bearer ${config.graphApiToken}`,
                }
              }
            )
        );

        await Promise.all(promises);

        const updateIds = reminders.map(reminder => reminder.idReminder)
        await updateDueTimeReminders(updateIds)
    
        return NextResponse.json("OK", { status: 200 });
      } catch (error) {
        console.log(error);
        return NextResponse.json("Error sending reminders", { status: 400 });
    }    

}