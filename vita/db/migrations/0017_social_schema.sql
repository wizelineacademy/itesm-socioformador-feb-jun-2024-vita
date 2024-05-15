CREATE TABLE IF NOT EXISTS "Comment" (
	"id_comment" serial PRIMARY KEY NOT NULL,
	"id_post" integer NOT NULL,
	"id_user" integer NOT NULL,
	"body" varchar(200) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Follow" (
	"id_follow" serial PRIMARY KEY NOT NULL,
	"follower_id" integer NOT NULL,
	"following_id" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Post" (
	"id_post" serial PRIMARY KEY NOT NULL,
	"id_user" integer NOT NULL,
	"image" varchar(300),
	CONSTRAINT "Post_id_user_unique" UNIQUE("id_user")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PostLike" (
	"id_post_like" serial PRIMARY KEY NOT NULL,
	"id_post" integer NOT NULL,
	"id_user" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "image" varchar(300);--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "coverImage" varchar(300);--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "profileImage" varchar(300);--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "has_notification" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Comment" ADD CONSTRAINT "Comment_id_post_Post_id_post_fk" FOREIGN KEY ("id_post") REFERENCES "Post"("id_post") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Comment" ADD CONSTRAINT "Comment_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Follow" ADD CONSTRAINT "Follow_follower_id_User_id_user_fk" FOREIGN KEY ("follower_id") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Follow" ADD CONSTRAINT "Follow_following_id_User_id_user_fk" FOREIGN KEY ("following_id") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Post" ADD CONSTRAINT "Post_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_id_post_Post_id_post_fk" FOREIGN KEY ("id_post") REFERENCES "Post"("id_post") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_id_user_User_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
