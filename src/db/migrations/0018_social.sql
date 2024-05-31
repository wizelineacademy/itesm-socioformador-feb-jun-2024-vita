CREATE TABLE IF NOT EXISTS "Followers" (
	"id_followers" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"follower_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Following" (
	"id_following" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"following_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PostLikes" (
	"id_like" serial PRIMARY KEY NOT NULL,
	"post_id" integer,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Post" (
	"id_posts" serial PRIMARY KEY NOT NULL,
	"creator_id" integer NOT NULL,
	"caption" text NOT NULL,
	"post_photo" text,
	"tag" varchar(50),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SavedPosts" (
	"id_saved_posts" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"post_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserPosts" (
	"id_user_posts" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"post_id" integer
);
--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "username" varchar(100);--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "profile_photo" text;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Followers" ADD CONSTRAINT "Followers_user_id_User_id_user_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Followers" ADD CONSTRAINT "Followers_follower_id_User_id_user_fk" FOREIGN KEY ("follower_id") REFERENCES "User"("id_user") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Following" ADD CONSTRAINT "Following_user_id_User_id_user_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Following" ADD CONSTRAINT "Following_following_id_User_id_user_fk" FOREIGN KEY ("following_id") REFERENCES "User"("id_user") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PostLikes" ADD CONSTRAINT "PostLikes_post_id_Post_id_posts_fk" FOREIGN KEY ("post_id") REFERENCES "Post"("id_posts") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PostLikes" ADD CONSTRAINT "PostLikes_user_id_User_id_user_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Post" ADD CONSTRAINT "Post_creator_id_User_id_user_fk" FOREIGN KEY ("creator_id") REFERENCES "User"("id_user") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "SavedPosts" ADD CONSTRAINT "SavedPosts_user_id_User_id_user_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "SavedPosts" ADD CONSTRAINT "SavedPosts_post_id_Post_id_posts_fk" FOREIGN KEY ("post_id") REFERENCES "Post"("id_posts") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserPosts" ADD CONSTRAINT "UserPosts_user_id_User_id_user_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserPosts" ADD CONSTRAINT "UserPosts_post_id_Post_id_posts_fk" FOREIGN KEY ("post_id") REFERENCES "Post"("id_posts") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
