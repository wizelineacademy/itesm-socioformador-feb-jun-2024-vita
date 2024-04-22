import { pgTable, varchar, timestamp, text, integer, uniqueIndex, serial, foreignKey, doublePrecision, date } from "drizzle-orm/pg-core"
import { sql, relations } from "drizzle-orm"

//tables

export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar("id", { length: 36 }).primaryKey().notNull(),
	checksum: varchar("checksum", { length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text("logs"),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const user = pgTable("User", {
	idUser: serial("id_user").primaryKey().notNull(),
	name: varchar("name", { length: 100 }).notNull(),
	email: varchar("email", { length: 50 }).notNull().unique(),
	password: varchar("password", { length: 64 }),
	phoneNumber: varchar("phone_number", { length: 50 }).unique(),
});

export const portionsNutrition = pgTable("PortionsNutrition", {
	idNutritonPortion: serial("id_nutriton_portion").primaryKey().notNull(),
	idUser: integer("id_user").notNull().unique().references(() => user.idUser, { onDelete: "restrict", onUpdate: "cascade" } ),
	fruits: integer("fruits").notNull(),
	vegetables: integer("vegetables").notNull(),
	milk: integer("milk").notNull(),
	legumes: integer("legumes").notNull(),
	cereals: integer("cereals").notNull(),
	meat: integer("meat").notNull(),
	sugar: integer("sugar").notNull(),
	fat: integer("fat").notNull(),
});

export const userDetail = pgTable("UserDetail", {
	idUserDetail: serial("id_user_detail").primaryKey().notNull(),
	idUser: integer("id_user").notNull().unique().references(() => user.idUser, { onDelete: "restrict", onUpdate: "cascade" } ),
	sex: varchar("sex", { length: 1 }).notNull(),
	weight: doublePrecision("weight").notNull(),
	height: doublePrecision("height").notNull(),
	bodyFat: doublePrecision("body_fat").notNull(),
	birthDate: date("birth_date", {mode: "date"}).notNull(),
	muscularMass: doublePrecision("muscular_mass").notNull(),
});


export const Reminders = pgTable("Reminders", {
	idReminders: serial("id_reminders").primaryKey().notNull(),
	idUser: integer("id_user").notNull().references(() => user.idUser, { onDelete: "restrict", onUpdate: "cascade" } ),
	name: varchar("name", { length: 100 }).notNull(),
	description: text("description").notNull(),
	frequency: integer("frequency").notNull(),
	startTime: timestamp("start_time").notNull(), 
	endTime: timestamp("end_time"), 
});

