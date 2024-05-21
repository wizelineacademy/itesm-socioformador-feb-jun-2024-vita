ALTER TABLE "UserReminders" RENAME TO "Reminders";--> statement-breakpoint
ALTER TABLE "Reminders" RENAME COLUMN "id_user_reminders" TO "id_reminders";--> statement-breakpoint
ALTER TABLE "Reminders" DROP CONSTRAINT "UserReminders_id_user_unique";--> statement-breakpoint
ALTER TABLE "Reminders" DROP CONSTRAINT "UserReminders_id_user_User_id_user_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Reminders" ADD CONSTRAINT "Reminders_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Reminders" ADD CONSTRAINT "Reminders_id_user_unique" UNIQUE("id_user");