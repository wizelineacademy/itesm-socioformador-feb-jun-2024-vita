CREATE TABLE IF NOT EXISTS "Goals" (
	"id_goal" serial PRIMARY KEY NOT NULL,
	"id_user" integer NOT NULL,
	"category" integer,
	"name" varchar(30) NOT NULL,
	"current_value" double precision,
	"desired_value" double precision
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Goals" ADD CONSTRAINT "Goals_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
