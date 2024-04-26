CREATE TABLE IF NOT EXISTS "UserReminders" (
	"id_user_reminders" serial PRIMARY KEY NOT NULL,
	"id_user" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"frequency" integer NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	CONSTRAINT "UserReminders_id_user_unique" UNIQUE("id_user")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserReminders" ADD CONSTRAINT "UserReminders_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
