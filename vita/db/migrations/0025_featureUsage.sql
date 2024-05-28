CREATE TABLE IF NOT EXISTS "FeatureUsage" (
	"id_feature_usage" serial PRIMARY KEY NOT NULL,
	"id_user" integer NOT NULL,
	"name" varchar(50) NOT NULL,
	"detail" varchar(50) NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "FeatureUsage" ADD CONSTRAINT "FeatureUsage_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
