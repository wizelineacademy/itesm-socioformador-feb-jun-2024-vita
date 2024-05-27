CREATE TABLE IF NOT EXISTS "Badges" (
	"id_badge" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" text NOT NULL,
	"image_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "MonthlyChallenge" (
	"id_challenge" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserPoints" (
	"id_user_point" serial PRIMARY KEY NOT NULL,
	"id_user" integer NOT NULL,
	"points" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "type" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserPoints" ADD CONSTRAINT "UserPoints_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
