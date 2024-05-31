CREATE TABLE IF NOT EXISTS "UserBadges" (
	"id_user_badges" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"badge_id" integer,
	CONSTRAINT "unique_user_badge" UNIQUE("user_id","badge_id")
);
--> statement-breakpoint
ALTER TABLE "Badges" DROP COLUMN IF EXISTS "image_url";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserBadges" ADD CONSTRAINT "UserBadges_user_id_User_id_user_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserBadges" ADD CONSTRAINT "UserBadges_badge_id_Badges_id_badge_fk" FOREIGN KEY ("badge_id") REFERENCES "Badges"("id_badge") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
