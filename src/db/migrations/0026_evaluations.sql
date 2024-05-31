CREATE TABLE IF NOT EXISTS "ChallengeEvaluations" (
	"id_evaluation" serial PRIMARY KEY NOT NULL,
	"id_user" integer NOT NULL,
	"id_challenge" integer NOT NULL,
	"evaluator_id" integer NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"evaluated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "unique_evaluation" UNIQUE("id_user","id_challenge","evaluator_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ChallengeSubmissions" (
	"id_submission" serial PRIMARY KEY NOT NULL,
	"id_user" integer NOT NULL,
	"id_challenge" integer NOT NULL,
	"image_url" text NOT NULL,
	"description" text NOT NULL,
	"passed" boolean DEFAULT false,
	"submitted_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Badges" ADD COLUMN "id_challenge" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Badges" ADD CONSTRAINT "Badges_id_challenge_MonthlyChallenge_id_challenge_fk" FOREIGN KEY ("id_challenge") REFERENCES "MonthlyChallenge"("id_challenge") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ChallengeEvaluations" ADD CONSTRAINT "ChallengeEvaluations_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ChallengeEvaluations" ADD CONSTRAINT "ChallengeEvaluations_id_challenge_MonthlyChallenge_id_challenge_fk" FOREIGN KEY ("id_challenge") REFERENCES "MonthlyChallenge"("id_challenge") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ChallengeEvaluations" ADD CONSTRAINT "ChallengeEvaluations_evaluator_id_User_id_user_fk" FOREIGN KEY ("evaluator_id") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ChallengeSubmissions" ADD CONSTRAINT "ChallengeSubmissions_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ChallengeSubmissions" ADD CONSTRAINT "ChallengeSubmissions_id_challenge_MonthlyChallenge_id_challenge_fk" FOREIGN KEY ("id_challenge") REFERENCES "MonthlyChallenge"("id_challenge") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
