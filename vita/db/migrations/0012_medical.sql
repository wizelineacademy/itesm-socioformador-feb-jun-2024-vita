CREATE TABLE IF NOT EXISTS "Allergies" (
	"id_allergies" serial PRIMARY KEY NOT NULL,
	"id_medical_profile" integer NOT NULL,
	"name" varchar(100),
	"reaction" varchar(100),
	CONSTRAINT "Allergies_id_medical_profile_unique" UNIQUE("id_medical_profile")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ChronicalDesease" (
	"id_chronical_desease" serial PRIMARY KEY NOT NULL,
	"id_medical_profile" integer NOT NULL,
	"name" varchar(100),
	CONSTRAINT "ChronicalDesease_id_medical_profile_unique" UNIQUE("id_medical_profile")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Disability" (
	"id_disability" serial PRIMARY KEY NOT NULL,
	"id_medical_profile" integer NOT NULL,
	"name" varchar(100),
	CONSTRAINT "Disability_id_medical_profile_unique" UNIQUE("id_medical_profile")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "MedicalProfile" (
	"id_medical_profile" serial PRIMARY KEY NOT NULL,
	"id_user" integer NOT NULL,
	"emergency_name" varchar(50),
	"emergency_phone" varchar(12),
	"policy" varchar(30),
	"insurance_company" varchar(50),
	"bloodType" varchar(30),
	CONSTRAINT "MedicalProfile_id_user_unique" UNIQUE("id_user")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Medicines" (
	"id_medicines" serial PRIMARY KEY NOT NULL,
	"id_medical_profile" integer NOT NULL,
	"name" varchar(100),
	"route_admin" varchar(100),
	"dose" varchar(100),
	"duration" varchar(100),
	CONSTRAINT "Medicines_id_medical_profile_unique" UNIQUE("id_medical_profile")
);
--> statement-breakpoint
ALTER TABLE "User" ALTER COLUMN "phone_number" SET DATA TYPE varchar(12);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Allergies" ADD CONSTRAINT "Allergies_id_medical_profile_MedicalProfile_id_medical_profile_fk" FOREIGN KEY ("id_medical_profile") REFERENCES "MedicalProfile"("id_medical_profile") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ChronicalDesease" ADD CONSTRAINT "ChronicalDesease_id_medical_profile_MedicalProfile_id_medical_profile_fk" FOREIGN KEY ("id_medical_profile") REFERENCES "MedicalProfile"("id_medical_profile") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Disability" ADD CONSTRAINT "Disability_id_medical_profile_MedicalProfile_id_medical_profile_fk" FOREIGN KEY ("id_medical_profile") REFERENCES "MedicalProfile"("id_medical_profile") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "MedicalProfile" ADD CONSTRAINT "MedicalProfile_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Medicines" ADD CONSTRAINT "Medicines_id_medical_profile_MedicalProfile_id_medical_profile_fk" FOREIGN KEY ("id_medical_profile") REFERENCES "MedicalProfile"("id_medical_profile") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
