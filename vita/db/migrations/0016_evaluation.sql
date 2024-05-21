CREATE TABLE IF NOT EXISTS "FeatureEvaluation" (
	"id_feature_evaluation" serial PRIMARY KEY NOT NULL,
	"id_user" integer NOT NULL,
	"name" varchar(50) NOT NULL,
	"grade" integer NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "GoalEvaluation" (
	"id_goal_evaluation" serial PRIMARY KEY NOT NULL,
	"id_user" integer NOT NULL,
	"id_goal" integer NOT NULL,
	"name" varchar(50) NOT NULL,
	"grade" integer NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Register" (
	"id_register" serial PRIMARY KEY NOT NULL,
	"id_user" integer NOT NULL,
	"category" varchar(15) NOT NULL,
	"name" varchar(50) NOT NULL,
	"value" double precision,
	"date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "FeatureEvaluation" ADD CONSTRAINT "FeatureEvaluation_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "GoalEvaluation" ADD CONSTRAINT "GoalEvaluation_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "GoalEvaluation" ADD CONSTRAINT "GoalEvaluation_id_goal_Goals_id_goal_fk" FOREIGN KEY ("id_goal") REFERENCES "Goals"("id_goal") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Register" ADD CONSTRAINT "Register_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
