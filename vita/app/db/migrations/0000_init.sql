CREATE TABLE IF NOT EXISTS "PortionsNutrition" (
	"id_nutriton_portion" serial PRIMARY KEY NOT NULL,
	"id_user" integer NOT NULL,
	"fruits" integer NOT NULL,
	"vegetables" integer NOT NULL,
	"milk" integer NOT NULL,
	"legumes" integer NOT NULL,
	"cereals" integer NOT NULL,
	"meat" integer NOT NULL,
	"sugar" integer NOT NULL,
	"fat" integer NOT NULL,
	CONSTRAINT "PortionsNutrition_id_user_unique" UNIQUE("id_user")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id_user" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(50) NOT NULL,
	"password" varchar(64),
	"phone_number" varchar(50),
	CONSTRAINT "User_email_unique" UNIQUE("email"),
	CONSTRAINT "User_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserDetail" (
	"id_user_detail" serial PRIMARY KEY NOT NULL,
	"id_user" integer NOT NULL,
	"sex" varchar(1) NOT NULL,
	"weight" double precision NOT NULL,
	"height" double precision NOT NULL,
	"body_fat" double precision NOT NULL,
	"birth_date" timestamp(3) NOT NULL,
	"muscular_mass" double precision NOT NULL,
	CONSTRAINT "UserDetail_id_user_unique" UNIQUE("id_user")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PortionsNutrition" ADD CONSTRAINT "PortionsNutrition_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserDetail" ADD CONSTRAINT "UserDetail_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
