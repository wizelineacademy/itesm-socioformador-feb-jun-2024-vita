import { and, eq } from 'drizzle-orm'
import { db } from '../drizzle'
import { monthlyChallenge } from '../schema/schema'

export async function getMonthlyChallenge() {
  try {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()

    const startDate = new Date(currentYear, currentMonth - 1, 1)
    const endDate = new Date(currentYear, currentMonth, 0)
    const existingChallenge = await db
      .select()
      .from(monthlyChallenge)
      .where(
        and(
          eq(monthlyChallenge.startDate, startDate.toISOString().split('T')[0]),
          eq(monthlyChallenge.endDate, endDate.toISOString().split('T')[0]),
        ),
      )

    if (existingChallenge.length > 0) {
      const { idChallenge, name, description, startDate, endDate } =
        existingChallenge[0]
      return { idChallenge, name, description, startDate, endDate }
    } else {
      return null
    }
  } catch (error) {
    console.error('Error al obtener el reto del mes actual:', error)
    throw error
  }
}
