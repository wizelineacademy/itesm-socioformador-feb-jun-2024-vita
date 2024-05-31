
import { NextResponse } from "next/server";
import {  userBadges, userPoints  } from "@/src/db/schema/schema";
import { db } from "@/src/db/drizzle";
import { eq, and  } from 'drizzle-orm';

export async function GET(request: Request ) {
  try {
    
    const res = await db.select()
    .from(userBadges )
    
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error retrieving badges" }, { status: 400 });
  }
}

/**
 * Agrega puntos y una insignia a un usuario en las tablas UserPoints y UserBadges.
 * 
 * @param {number} userId - El ID del usuario al que se agregarán los puntos y la insignia.
 * @param {number} pointsToAdd - El número de puntos que se agregarán al usuario.
 * @param {number} badgeId - El ID de la insignia que se asignará al usuario.
 * @returns {Object} Un objeto con la información sobre el resultado de la operación.
 * @returns {boolean} success - Indica si la operación fue exitosa o no.
 * @returns {string} message - Mensaje que describe el resultado de la operación.
 *     En caso de éxito, este mensaje será "User points and badges added successfully".
 *     En caso de error, este mensaje describirá el error ocurrido.
 * @throws {Error} Se lanza un error si ocurre algún problema durante la ejecución de la operación.
 */
export async function addUserPointsAndBadges(userId: number, pointsToAdd: number, badgeId: number) {
  try {
      // Comprobamos si el usuario ya tiene una entrada en la tabla UserBadge
        const existingBadge = await db.select()
        .from(userBadges)
        .where(
          and(
            eq(userBadges.userId, Number(userId)),
            eq(userBadges.badgeId, Number(badgeId))
          )
        );

        if (existingBadge.length > 0) {
          return NextResponse.json("The table userBadges has already been filled", { status: 409 });
        }

        await db.insert(userBadges).values({
          userId: userId,
          badgeId: badgeId
        });
        
      const userPointsEntry = await db.select()
      .from(userPoints)
      .where(eq(userPoints.idUser, Number(userId)));

      if (userPointsEntry.length === 0) {
      // Si el usuario no tiene una entrada en la tabla UserPoints, creamos una nueva
          await db.insert(userPoints).values({
              idUser: userId,
              points: pointsToAdd
          });
      } else {
      // Si el usuario ya tiene una entrada, actualizamos los puntos sumándolos con los puntos a añadir
          const currentPoints = userPointsEntry[0].points;
          const newPoints = currentPoints + pointsToAdd;
          await db.update(userPoints).set({ points: newPoints }).where(eq(userPoints.idUser, Number(userId)));
      }


      return { success: true, message: 'User points and badges added successfully' };
  } catch (error) {
      console.error('Error adding user points and badges:', error);
      return { success: false, message: 'Error adding user points and badges' };
  }
}



export async function addUserPoints(userId: number, pointsToAdd: number) {
  try {
      
        
      const userPointsEntry = await db.select()
      .from(userPoints)
      .where(eq(userPoints.idUser, Number(userId)));

      if (userPointsEntry.length === 0) {
      // Si el usuario no tiene una entrada en la tabla UserPoints, creamos una nueva
          await db.insert(userPoints).values({
              idUser: userId,
              points: pointsToAdd
          });
      } else {
      // Si el usuario ya tiene una entrada, actualizamos los puntos sumándolos con los puntos a añadir
          const currentPoints = userPointsEntry[0].points;
          const newPoints = currentPoints + pointsToAdd;
          await db.update(userPoints).set({ points: newPoints }).where(eq(userPoints.idUser, Number(userId)));
      }


      return { success: true, message: 'User points  added successfully' };
  } catch (error) {
      console.error('Error adding user points:', error);
      return { success: false, message: 'Error adding user points' };
  }
}