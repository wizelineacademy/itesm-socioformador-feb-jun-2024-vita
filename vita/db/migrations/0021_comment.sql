ALTER TABLE "SavedPosts" RENAME TO "Comments";--> statement-breakpoint
ALTER TABLE "Comments" RENAME COLUMN "id_saved_posts" TO "id_comment";--> statement-breakpoint
ALTER TABLE "Comments" DROP CONSTRAINT "SavedPosts_user_id_User_id_user_fk";
--> statement-breakpoint
ALTER TABLE "Comments" DROP CONSTRAINT "SavedPosts_post_id_Post_id_posts_fk";
--> statement-breakpoint
ALTER TABLE "Comments" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Comments" ALTER COLUMN "post_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Comments" ADD COLUMN "content" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Comments" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Comments" ADD CONSTRAINT "Comments_post_id_Post_id_posts_fk" FOREIGN KEY ("post_id") REFERENCES "Post"("id_posts") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_id_User_id_user_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "User" DROP COLUMN IF EXISTS "username";